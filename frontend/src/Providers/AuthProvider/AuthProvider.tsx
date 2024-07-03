import React from 'react'
import { TAuthUser } from '../../types/AuthUserTypes';
import { deleteCookie } from '../../utilities/cookiesOperations';
import { AuthContext } from './AuthContext';
import { getUser } from '../../services/authService';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = React.useState<TAuthUser | null>(null);
    const [loading, setLoading] = React.useState(true);

    const setAuthUser = React.useCallback((user?: TAuthUser) => {
        if (!user && !loading) {
            deleteCookie("accessToken")
        }
        setState(user ? user : null)
    }, []);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await getUser();
                // console.log("data from getUser service: ", data);
                if (data.user) {
                    setAuthUser(data.user);
                }
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        })()
    }, []);

    const contextValue = React.useMemo(() => ({ authUser: state, setAuthUser }), [state, setAuthUser]);

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
