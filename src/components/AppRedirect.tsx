import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export type RedirectType = 'role-based' | 'default-route' | 'fallback';

interface RoleBasedRedirectProps {
    type: 'role-based';
    officerPath: string;
    userPathTemplate: string;
}

interface DefaultRouteRedirectProps {
    type: 'default-route';
    path: string;
}

interface FallbackRedirectProps {
    type: 'fallback';
    fallbackPath: string;
}

type RedirectProps = RoleBasedRedirectProps | DefaultRouteRedirectProps | FallbackRedirectProps;

export const AppRedirect = (props: RedirectProps) => {
    const user = useAppSelector(state => state.auth.user);

    switch (props.type) {
        case 'role-based':
            if (user?.role === 'officer') {
                return <Navigate to={props.officerPath} replace />;
            } else {
                return <Navigate to={props.userPathTemplate.replace(':id', user?.id?.toString() || '')} replace />;
            }

        case 'default-route':
            return <Navigate to={props.path} replace />;

        case 'fallback':
            return <Navigate to={props.fallbackPath} replace />;

        default:
            return <Navigate to="/auth/login" replace />;
    }
};

// Helper function for authentication checks
export const getAuthRedirect = (authContext: any) => {
    if (!authContext?.isAuthenticated || !authContext.user) {
        return <Navigate to="/auth/login" replace />;
    }
    return null;
};