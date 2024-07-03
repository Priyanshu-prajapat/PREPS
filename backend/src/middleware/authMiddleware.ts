import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { User } from '../schema/userSchema.js';

export async function currentMiddleware(req: Request, res: Response, next: NextFunction) {
    // console.log("AccessToken", req.cookies?.accessToken);
    const accessToken = req.cookies?.accessToken || req.headers['authorization'];

    if (!accessToken) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    let decoded;
    try {
        decoded = jwt.verify(accessToken, `${process.env.JWT_SECRET_KEY}`);
    } catch (err: any) {
        // Handle token expiration error specifically
        if (err.name === 'TokenExpiredError') {
            const decodedExpiredToken = jwt.decode(accessToken);
            if (decodedExpiredToken && decodedExpiredToken.sub) {
                await User.updateOne(
                    { _id: decodedExpiredToken.sub },
                    { $pull: { tokens: { auth_token: accessToken } } }
                );
            }
            return res.status(401).json({ message: 'Token expired, please login again' });
        } else {
            return res.status(403).json({ message: 'Invalid token' });
        }
    }

    if (!decoded || !decoded.sub) {
        // console.log("Invalid token payload:", decoded);
        return res.status(403).json({ message: 'Invalid token payload' });
    }

    const user = await User.findOne({ _id: decoded.sub });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const tokenExists = user.tokens.some(t => t.auth_token === accessToken);
    if (!tokenExists) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    req.body.verifiedUser = user;
    next();
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // check that user is acutally the main user.
    // console.log("the verfiedUser is: ", req.body.verifiedUser)
    if (!req.body.verifiedUser) {
        return res.status(404).send({ message: "user is unAuthenticated." })
    }
    console.log("user is Authenticated.");
    next();
}

// Thing about it later. in pending state.
export function isVerifiedMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.body.verifiedUser.isVerified) {
        return res.status(404).send({ message: "user is unVerified." })
    }
    next();
}