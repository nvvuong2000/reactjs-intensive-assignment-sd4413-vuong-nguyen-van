import React, { useEffect, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface AuthenticatedProviderProps {
    children: ReactNode;
}

export const AuthenticatedProvider: React.FC<AuthenticatedProviderProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (isLoading) {
            dispatch({ type: 'auth/setLoading', payload: false });
        }
    }, [dispatch, isLoading]);

    return <>{children}</>;
};