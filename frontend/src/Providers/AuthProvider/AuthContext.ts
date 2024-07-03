import React from "react";
import { TAuthUser } from "../../types/AuthUserTypes";

export type TAuthContext = {
    authUser: TAuthUser | null;
    setAuthUser: (user?: TAuthUser) => void;
}

export const AuthContext = React.createContext<TAuthContext>({
    authUser: null,
    setAuthUser: (user?: TAuthUser) => { },
});

export function useAuth() {
    return React.useContext(AuthContext);
}