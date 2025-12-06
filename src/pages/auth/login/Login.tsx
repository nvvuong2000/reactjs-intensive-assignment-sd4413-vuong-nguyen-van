import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUser, setToken, logout } from "../../../store/slices/authSlice";

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    role: string;
}

const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

const fetchCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch('https://dummyjson.com/user/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector(state => state.auth);
    const [localToken, setLocalToken] = useState<string | null>(null);
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'officer') {
                navigate('/pages/review');
            } else {
                navigate(`/pages/user/${user.id}/personal-information`);
            }
        }
    }, [isAuthenticated, user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(setToken(data.accessToken));
            setLocalToken(data.accessToken);
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    });

    const { data: currentUser, isLoading: isUserLoading, error: userError } = useQuery({
        queryKey: ['currentUser', localToken],
        queryFn: () => fetchCurrentUser(localToken!),
        enabled: !!localToken,
        retry: 1,
    });

    useEffect(() => {
        if (currentUser) {
            const userRole = currentUser.role === 'admin' ? 'officer' : 'user';
            dispatch(setUser({
                id: currentUser.id,
                username: currentUser.username,
                email: currentUser.email,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                gender: currentUser.gender,
                image: currentUser.image,
                role: userRole
            }));
            if (userRole === 'officer') {
                navigate('/pages/review');
            } else {
                navigate(`/pages/user/${currentUser.id}/personal-information`);
            }
        }
    }, [currentUser, dispatch, navigate]);

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const handleLogout = () => {
        dispatch(logout());
        setLocalToken(null);
    };

    if (isAuthenticated && user) {
        return null;
    }
    if (currentUser) {
        return currentUser.role === 'admin' ? <><p>This is admin page</p></> :(
            <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
                <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Welcome Back!
                    </h2>
                    <div className="text-center space-y-4">
                        {currentUser.image && (
                            <img 
                                src={currentUser.image} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full mx-auto"
                            />
                        )}
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {currentUser.firstName} {currentUser.lastName}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Username: {currentUser.username}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                                Email: {currentUser.email}
                            </p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a href="#" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
            <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo"/>
                <span>Simple KYC Authentication</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {loginMutation.error && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-800">
                            Login failed. Please check your credentials and try again.
                        </div>
                    )}

                    {isUserLoading && (
                        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-200 dark:text-blue-800">
                            Loading user data...
                        </div>
                    )}

                    {userError && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-800">
                            Failed to load user data. Please try again.
                        </div>
                    )}

                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            disabled={loginMutation.isPending}
                            {...register("username", {
                                required: "Username is required"
                            })}
                            className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${loginMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            placeholder="Enter your username (try: emilys)"
                        />
                        {errors.username && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            disabled={loginMutation.isPending}
                            {...register("password", {
                                required: "Password is required"
                            })}
                            placeholder="••••••••" 
                            className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${loginMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Try password: emilyspass
                        </p>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
                        </div>
                        <Link to='/pages/auth/reset-password' className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</Link>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loginMutation.isPending}
                        className={`w-full px-5 py-3 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-300 sm:w-auto ${
                            loginMutation.isPending 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                        }`}
                    >
                        {loginMutation.isPending ? 'Logging in...' : 'Login to your account'}
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Forgot password? <Link to='/auth/sign-up' className="text-primary-700 hover:underline dark:text-primary-500">Sign-up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;