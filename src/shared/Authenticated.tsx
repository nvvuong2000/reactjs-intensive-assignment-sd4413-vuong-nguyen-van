import { createContext, ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUser, setToken, logout, setLoading } from "../store/slices/authSlice";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    role: 'user' | 'officer';
}

interface AuthContextType {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    isAuthenticated: boolean;
    token: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const AuthenticatedContext = createContext<AuthContextType | null>(null);

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
    const dispatch = useAppDispatch();
    const { user, token, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

    useEffect(() => {
        const initializeAuth = async () => {
            dispatch(setLoading(true));
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                dispatch(setToken(storedToken));
                try {
                    const response = await fetch('https://dummyjson.com/user/me', {
                        headers: { 'Authorization': `Bearer ${storedToken}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const userRole = data.role === 'admin' ? 'officer' : 'user';
                        dispatch(setUser({
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            gender: data.gender,
                            image: data.image,
                            role: userRole
                        }));
                    } else {
                        dispatch(setUser(null));
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    dispatch(setUser(null));
                }
            }
            dispatch(setLoading(false));
        };

        initializeAuth();
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const value: AuthContextType = {
        user,
        setUser: (user) => dispatch(setUser(user)),
        isAuthenticated,
        token,
        setToken: (token) => dispatch(setToken(token)),
        logout: handleLogout
    };

    return (
        <AuthenticatedContext.Provider value={value}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export { AuthenticatedProvider, AuthenticatedContext };