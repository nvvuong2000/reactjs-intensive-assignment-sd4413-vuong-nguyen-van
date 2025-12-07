import {Link} from "react-router-dom";
import React, {ReactElement} from "react";
import { useAppSelector } from "../../store/hooks";

interface MenuItem {
    name: string;
    link: string;
    icon: ReactElement;
}

const Sidebar = () => {
    const { user } = useAppSelector(state => state.auth);
    const isOfficer = user?.role === 'officer';

    const menuItems: MenuItem[] = isOfficer ? [
        {
            name: 'Review',
            link: '/pages/review',
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path>
            </svg>
        },
        {
            name: 'Profile',
            link: `/pages/user/${user?.id}/personal-information`,
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
            </svg>
        }
    ] : [
        {
            name: 'Profile',
            link: `/pages/user/${user?.id}/personal-information`,
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
            </svg>
        }
    ];
    return (
        <aside id="sidebar"
               className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
               aria-label="Sidebar">
            <div
                className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div
                        className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <ul className="pb-2 space-y-2">
                            {
                                menuItems.map((item: MenuItem) => (
                                    <li>
                                        <Link to={item.link}
                                           className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                            {item.icon}
                                            <span className="ml-3" sidebar-toggle-item="">{item.name}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar