import React from 'react';
import './App.css';
import {RouterProvider, } from "react-router";
import appRouter from "./app.router";
import {AuthenticatedProvider} from "./shared/Authenticated";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserDataProvider } from './contexts/UserDataContext';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthenticatedProvider>
                <UserDataProvider>
                    <RouterProvider router={appRouter} />
                </UserDataProvider>
            </AuthenticatedProvider>
        </QueryClientProvider>
    )
}

export default App;
