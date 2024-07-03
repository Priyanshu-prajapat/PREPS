import { NextFunction, Request, Response } from "express";
import { User } from '../schema/userSchema.js';
import { hashPassword } from "./helperServices/passwordService.js";
import { generateRandomSixDigitNumber, generateToken, verifyPassword } from './helperServices/helperServices.js';
import { sendMail } from '../mailer/index.js';
import { verificationTemplate } from '../mailer/templates/index.js';

// one issue is we are not hiding user password when user signin and signup. should we need to send whole user or we can
// only the message or true false or we send some info of the user.

export async function signupUser(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.cookie("accessToken", user.tokens[0].auth_token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000, // 1 hour,
            })
            return res.status(400).json({
                message: 'User already exists',
                user
            });
        }
        // random code is generated here.
        const randomCode = generateRandomSixDigitNumber();
        // encrypt the password and save user data into user collection.
        const encryptedPassword = await hashPassword(req.body.password)
        const newUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: encryptedPassword,
            verificationCode: `${randomCode}`,
        });

        const result = await newUser.save()

        //generate a jwt token
        // there could be troble
        const access_token = await generateToken(newUser);
        result.tokens.push({ auth_token: access_token })
        await result.save();


        // create link and send mail to that email.
        sendMail(req.body.email, "Account Verification", verificationTemplate(result.firstName, randomCode.toString()))

        res.cookie("accessToken", access_token, {
            maxAge: 3600000, // 1 hour,
        })

        return res.status(200).send({
            message: "user add successfully",
            user: result
        })
    } catch (error) {
        console.error("having issue add new user", error);
        return res.status(500).send({ message: "having issue to add new user" })
    }
}

export async function verifyUserAccount(req: Request, res: Response, next: NextFunction) {
    const verificationCode = req.params.code;
    if (verificationCode) {
        try {
            const user = await User.findOne({ verificationCode });

            if (!user) {
                return res.send({ message: "The verification code is not valid." });
            }

            user.isVerified = true;
            const editedUser = await user.save(); // Don't forget to save the updated user
            console.log(editedUser)
            res.redirect("http://localhost:3000/")
            // return res.send({
            //     message: `User verification with code ${verificationCode} is done.`,
            //     verified: true,
            // });
        } catch (error: any) {
            return res.status(500).send({
                message: "An error occurred during verification.",
                error: error.message,
            });
        }
    }
}

export async function signinUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await verifyPassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // if (!user.isVerified) {
        //     // send message that "please verify you account from your email."
        //     return res.status(403).json({
        //         error: 'please verify you account from your email.'
        //     });
        // }

        const token = await generateToken(user);
        console.log(token.toString())
        user.tokens.push({ auth_token: token });
        await user.save();

        res.cookie('accessToken', token, {
            maxAge: 3600000 // 1 hour.
        });

        res.status(200).send({
            message: 'Sign in successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}