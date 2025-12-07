import React, { Suspense } from "react";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import { AppRedirect } from "../components/AppRedirect";
import LoadingSpinner from "../components/LoadingSpinner";
const HomeComponent = React.lazy(() => import("./home/HomeComponent"));
const ForbiddenPage = React.lazy(() => import("./ForbiddenPage"));

const pageRoutes = [
    {
        path: 'pages',
        element: <Pages/>,
        children: [
            {
                index: true,
                element: <AppRedirect
                    type="role-based"
                    officerPath="/pages/review"
                    userPathTemplate="/pages/user/:id/personal-information"
                />
            },
            {
                path: 'home',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <HomeComponent/>
                    </Suspense>
                )
            },
            {
                path: '403',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ForbiddenPage/>
                    </Suspense>
                )
            },
            ...authRoutes,
            ...userRoutes
        ]
    },

]

export default pageRoutes;