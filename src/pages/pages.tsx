import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import Footer from "../components/footer";
import React, { Suspense } from "react";
import { useAppSelector } from "../store/hooks";
import LoadingSpinner from "../components/LoadingSpinner";
const Login = React.lazy(() => import("./auth/login/Login"));

const Pages = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth);
    return (
        <>
            <Header/>

            { isAuthenticated ? (
                <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Sidebar/>
                    <div id="main-content"
                         className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                        <main>
                            <Outlet></Outlet>
                            <Footer/>
                        </main>
                    </div>
                </div>
            ) : (
                <Suspense fallback={<LoadingSpinner />}>
                    <Login />
                </Suspense>
            )}

        </>
    )
}

export default Pages