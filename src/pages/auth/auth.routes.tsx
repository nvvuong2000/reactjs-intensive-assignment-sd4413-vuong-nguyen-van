import React, { Suspense } from "react";
import { RouteObject } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
const Login = React.lazy(() => import("./login/Login"));
const ResetPassword = React.lazy(() => import("./reset-password/reset-password"));
const Auth = React.lazy(() => import("./auth"));
const SignUp = React.lazy(() => import("./sign-up/sign-up"));

const authRoutes: RouteObject[] = [
    {
        path: 'auth',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <Auth/>
            </Suspense>
        ),
        children: [
            {
                path: 'login',
                element: (
                        <Suspense fallback={<LoadingSpinner />}>
                            <Login/>
                        </Suspense>
                )
            },
        ]

    }
]

export default authRoutes;