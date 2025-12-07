import React, { Suspense } from "react";
import { RouteObject } from "react-router";
import { ProtectedRoute, RoleBasedRoute } from "../../components/ProtectedRoute";
import LoadingSpinner from "../../components/LoadingSpinner";
const PersonalInformation = React.lazy(() => import("./personal-information/personal-information"));
const UserKYC = React.lazy(() => import("./kyc/kyc"));
const User = React.lazy(() => import("./user"));
const Review = React.lazy(() => import("../review/Review"));

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: (
            <Suspense fallback={<LoadingSpinner />}>
                <User/>
            </Suspense>
        ),
        children: [
            {
                path: ':id/personal-information',
                element: (
                    <ProtectedRoute allowOwnProfileOnly={true}>
                        <Suspense fallback={<LoadingSpinner />}>
                            <PersonalInformation/>
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: ':id/kyc',
                element: (
                    <ProtectedRoute allowOwnProfileOnly={true}>
                        <Suspense fallback={<LoadingSpinner />}>
                            <UserKYC/>
                        </Suspense>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: 'review',
        element: (
            <RoleBasedRoute allowedRoles={['officer']}>
                <Suspense fallback={<LoadingSpinner />}>
                    <Review/>
                </Suspense>
            </RoleBasedRoute>
        )
    }
]

export default userRoutes;