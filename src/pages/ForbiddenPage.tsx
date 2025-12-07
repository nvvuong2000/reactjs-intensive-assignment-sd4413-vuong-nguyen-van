import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
                </p>
            </div>
        </div>
    );
};

export default ForbiddenPage;