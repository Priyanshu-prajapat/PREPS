import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with cost factor 10
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};