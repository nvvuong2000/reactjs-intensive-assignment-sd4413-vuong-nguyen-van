import React from 'react';
import './App.css';
import { RouterProvider } from "react-router";
import appRouter from "./app.router";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserDataProvider } from './contexts/UserDataContext';

const queryClient = new QueryClient();

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <UserDataProvider>
                    <RouterProvider router={appRouter} />
                </UserDataProvider>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
