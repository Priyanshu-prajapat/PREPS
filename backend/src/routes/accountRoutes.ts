import { NextFunction, Request, Response, Router } from "express";

const router = Router()

router.get('/profile', (req: Request, res: Response) => {
    // console.log("at Profiler", req.body.verifiedUser)
    res.send({ user: req.body.verifiedUser })
});

export default router