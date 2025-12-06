import {RouteObject} from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";
import Review from "../review/Review";
import { ProtectedRoute, RoleBasedRoute } from "../../components/ProtectedRoute";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User/>,
        children: [
            {
                path: ':id/personal-information',
                element: (
                    <ProtectedRoute allowOwnProfileOnly={true}>
                        <PersonalInformation/>
                    </ProtectedRoute>
                )
            },
            {
                path: ':id/kyc',
                element: (
                    <ProtectedRoute allowOwnProfileOnly={true}>
                        <UserKYC/>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: 'review',
        element: (
            <RoleBasedRoute allowedRoles={['officer']}>
                <Review/>
            </RoleBasedRoute>
        )
    }
]

export default userRoutes;