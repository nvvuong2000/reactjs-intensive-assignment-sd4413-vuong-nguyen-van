import {createContext, ReactElement, useState, useEffect} from "react";

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

const AuthenticatedProvider = ({children}: {children: ReactElement}) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem('authToken');
    });

    // Hydrate user from token on app load
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken && !token) {
            setToken(storedToken);
        }
        // If token exists but user is not set, fetch user info
        if (storedToken && !user) {
            fetch('https://dummyjson.com/user/me', {
                headers: { 'Authorization': `Bearer ${storedToken}` }
            })
                .then(res => res.json())
                .then(data => {
                    // Map role: admin -> officer, others -> user
                    const userRole = data.role === 'admin' ? 'officer' : 'user';
                    setUser({
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        image: data.image,
                        role: userRole
                    });
                })
                .catch(() => setUser(null));
        }
    }, []);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
    };

    const value: AuthContextType = {
        user,
        setUser,
        isAuthenticated: !!user && !!token,
        token,
        setToken,
        logout
    };

    return (
        <AuthenticatedContext.Provider value={value}>
            {children}
        </AuthenticatedContext.Provider>
    );
}

export { AuthenticatedProvider, AuthenticatedContext};