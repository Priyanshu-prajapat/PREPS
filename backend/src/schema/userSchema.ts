import bcrypt from 'bcryptjs';
import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    lastLoginDate: {
        type: Date,
        default: Date.now()
    },
    roles: {
        type: String,
        default: "Member",
        enum: ["Member", "Admin"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
    tokens: [
        {
            auth_token: {
                type: String,
                required: true
            }
        }
    ]
});

// I don't know what is doing that. first i figure it out. then apply
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

const User = mongoose.model('User', userSchema);

export { User };