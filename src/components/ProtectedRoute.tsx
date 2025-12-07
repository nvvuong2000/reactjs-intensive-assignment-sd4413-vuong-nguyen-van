import { ReactNode, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getAuthRedirect } from "./AppRedirect";

const ForbiddenRedirect = () => <Navigate to="/pages/403" replace />;

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: 'user' | 'officer';
    allowOwnProfileOnly?: boolean;
}

export const ProtectedRoute = ({ children, requiredRole, allowOwnProfileOnly }: ProtectedRouteProps) => {
    const { id: urlUserId } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAppSelector(state => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    if (requiredRole && user && user.role !== requiredRole) {
        return ForbiddenRedirect();
    }

    if (allowOwnProfileOnly && user && user.role === 'user') {
        const currentUserId = user.id.toString();
        if (urlUserId && urlUserId !== currentUserId) {
            return ForbiddenRedirect();
        }
    }
    return <>{children}</>;
};

interface RoleBasedRouteProps {
    children: ReactNode;
    allowedRoles: Array<'user' | 'officer'>;
}

export const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
    const { user, isAuthenticated } = useAppSelector(state => state.auth);

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/login" replace />;
    }
    if (!allowedRoles.includes(user.role)) {
        return ForbiddenRedirect();
    }

    return <>{children}</>;
};

interface GuestRouteProps {
    children: ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
    const { isAuthenticated } = useAppSelector(state => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/pages/home" replace />;
    }

    return <>{children}</>;
};
