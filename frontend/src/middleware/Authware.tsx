import React from 'react'
import { useAuth } from '../Providers/AuthProvider/AuthContext'
import { Navigate } from 'react-router-dom';
import { useRouteMatch } from '../hooks';
import { anonymousRoutes, publicRoutes } from '../utilities/routes';

function Authware({ PageComponent }: any) {
    const { authUser } = useAuth();
    const isPublic = useRouteMatch(publicRoutes);
    const isAnonymousRoute = useRouteMatch(anonymousRoutes);

    if (!isPublic) {
        if (isAnonymousRoute) {
            if (authUser) {
                return <Navigate to="/" />
            }
        } else {
            if (!authUser) {

                return <Navigate to="/auth/signin" />
            } else if (authUser && !authUser.isVerified) {
                //navigate("/error", { state: { message: "User is not verified." } }); // Redirect to the error page if the user is not verified
                return <Navigate to="/error" />
            }
        }
    }

    return (
        <React.Fragment>
            <PageComponent />
        </React.Fragment>
    )
}

export default Authware