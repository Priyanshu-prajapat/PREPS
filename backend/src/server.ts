import express, { Response, Request } from "express"
import { config } from "dotenv";
import authController from "./routes/authRoutes.js"
import interviewController from "./routes/interviewRoutes.js"
import accountController from "./routes/accountRoutes.js"
import mongoose from "mongoose";
import { authMiddleware, currentMiddleware, isVerifiedMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser"
import cors from 'cors'

config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: true
}))

mongoose.connect(`${process.env.MONGO_DB_URL}`)
    .then(() => {
        console.log("mongo DB is connected successfully ");
        app.listen(port, () => {
            console.log("Your app is running on this port ", port);
        })
    }).catch((error) => {
        console.log("mongo DB is not connected having some issue ", error);
    })

app.use("/auth", authController);
app.use("/account", currentMiddleware, authMiddleware, accountController)
app.use("/interview", currentMiddleware, authMiddleware, interviewController)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello users server in typescript.")
});