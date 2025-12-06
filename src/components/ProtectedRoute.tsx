import { ReactNode, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getAuthRedirect } from "./AppRedirect";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: 'user' | 'officer';
    allowOwnProfileOnly?: boolean;
}

export const ProtectedRoute = ({ children, requiredRole, allowOwnProfileOnly }: ProtectedRouteProps) => {
    const { id: urlUserId } = useParams<{ id: string }>();
    const { user, isAuthenticated } = useAppSelector(state => state.auth);

    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        if (user.role !== 'officer') {
            return <Navigate to="/auth/login" replace />;
        }
    }
    if (allowOwnProfileOnly && user.role === 'user') {
        const currentUserId = user.id.toString();
        if (urlUserId && urlUserId !== currentUserId) {
            return <Navigate to={`/user/${currentUserId}/pi`} replace />;
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
        return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
};
