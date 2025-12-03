import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LoginFormData {
    username: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    };

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
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 8,
                                    message: "Username must be at least 8 characters long"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Username must not exceed 10 characters"
                                }
                            })}
                            className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} 
                            placeholder="Enter your username"
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
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 12,
                                    message: "Password must be at least 12 characters long"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Password must not exceed 16 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#&!]).+$/,
                                    message: "Password must contain at least one letter, one number, and one special character (@, #, &, !)"
                                }
                            })}
                            placeholder="••••••••" 
                            className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
                        </div>
                        <Link to='/pages/auth/reset-password' className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</Link>
                    </div>
                    <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login to your account</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Forgot password? <Link to='/auth/sign-up' className="text-primary-700 hover:underline dark:text-primary-500">Sign-up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;