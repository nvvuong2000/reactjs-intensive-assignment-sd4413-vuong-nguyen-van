import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateReview, loadReviewData } from "../../store/slices/reviewSlice";
import api from "../../services/api";
import { current } from "@reduxjs/toolkit";

interface ReviewedUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    kycStatus: 'pending' | 'approved' | 'rejected';
    reviewedAt?: string;
    reviewedBy?: string;
}

interface ReviewData {
    [userId: number]: {
        status: 'pending' | 'approved' | 'rejected';
        reviewedAt: string;
        reviewedBy: string;
    };
}

const Review = () => {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector(state => state.auth);
    const { reviewData } = useAppSelector(state => state.review);
    const isOfficer = user?.role === 'officer';

    const [localReviewData, setLocalReviewData] = useState<ReviewData>({});

    useEffect(() => {
        dispatch(loadReviewData());
    }, [dispatch]);

    useEffect(() => {
        setLocalReviewData(reviewData);
    }, [reviewData]);
    const { data: usersData, isLoading: isUserLoading, error: userError } = useQuery({
        queryKey: ['currentUser', token],
        queryFn: () => fetchCurrentUser(token!),
        enabled: !!token,
        retry: 1,
    });

    const fetchCurrentUser = async (token: string): Promise<{ users: ReviewedUser[] }> => {
        const response = await api.get('/users');
         return response.data?.users;
    };

    useEffect(() => {
        dispatch(loadReviewData());
    }, [dispatch]);

    useEffect(() => {
        setLocalReviewData(reviewData);
    }, [reviewData]);

    const reviewUser = (userId: number, status: 'approved' | 'rejected') => {
        if (!user) return;
        dispatch(updateReview({
            userId,
            status,
            reviewedBy: `${user.firstName} ${user.lastName}`
        }));
    };

    const users: ReviewedUser[] = Array.isArray(usersData) ? usersData : [];

    const displayedUsers = users.filter(u => u.id !== user?.id).map(u => ({
        ...u,
        kycStatus: localReviewData[u.id]?.status || 'pending',
        reviewedAt: localReviewData[u.id]?.reviewedAt,
        reviewedBy: localReviewData[u.id]?.reviewedBy
    }));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="mb-4 col-span-full xl:mb-2">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#"
                               className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                      aria-current="page">Review</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {isOfficer ? 'All User Reviews' : 'My Review Status'}
                </h1>
            </div>

            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">User ID</th>
                                <th scope="col" className="px-4 py-3">Name</th>
                                <th scope="col" className="px-4 py-3">Email</th>
                                <th scope="col" className="px-4 py-3">KYC Status</th>
                                {isOfficer && (
                                    <>
                                        <th scope="col" className="px-4 py-3">Reviewed By</th>
                                        <th scope="col" className="px-4 py-3">Reviewed At</th>
                                    </>
                                )}
                                <th scope="col" className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={isOfficer ? 7 : 5} className="px-4 py-8 text-center">
                                        <p className="text-gray-500 dark:text-gray-400">No review results found</p>
                                    </td>
                                </tr>
                            ) : (
                                displayedUsers.map((reviewedUser) => (
                                    <tr key={reviewedUser.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {reviewedUser.id}
                                        </td>
                                        <td className="px-4 py-3">
                                            {reviewedUser.firstName} {reviewedUser.lastName}
                                        </td>
                                        <td className="px-4 py-3">{reviewedUser.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusColor(reviewedUser.kycStatus)}`}>
                                                {reviewedUser.kycStatus.toUpperCase()}
                                            </span>
                                        </td>
                                        {isOfficer && (
                                            <>
                                                <td className="px-4 py-3">{reviewedUser.reviewedBy || '-'}</td>
                                                <td className="px-4 py-3">{reviewedUser.reviewedAt ? new Date(reviewedUser.reviewedAt).toLocaleDateString() : '-'}</td>
                                            </>
                                        )}
                                        <td className="px-4 py-3">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/pages/user/${reviewedUser.id}/personal-information`}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    View KYC
                                                </Link>
                                                {isOfficer && reviewedUser.id !== user.id && reviewedUser.kycStatus === 'pending' && (
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={() => reviewUser(reviewedUser.id, 'approved')}
                                                            className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => reviewUser(reviewedUser.id, 'rejected')}
                                                            className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Review;
