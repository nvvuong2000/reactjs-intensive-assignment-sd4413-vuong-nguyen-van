import HomeComponent from "./home/HomeComponent";
import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import { AppRedirect } from "../components/AppRedirect";

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
                element: <HomeComponent/>
            },
            ...authRoutes,
            ...userRoutes
        ]
    },

]

export default pageRoutes;