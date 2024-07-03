
export type TError = {
    message: string;
};

export type TAuthUser = {
    _id: string,
    firstName: string;
    lastName: string;
    email: string;
    lastLoginDate: Date;
    roles: "Member" | "Admin";
    isVerified: boolean;
    tokens: TToken[];
    verificationCode?: string | undefined;
    __v?: number,
}

export type TToken = {
    auth_Token?: string,
    _id: string,
}

export type TSignupCredentials = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type TSigninCredentails = {
    email: string,
    password: string,
}