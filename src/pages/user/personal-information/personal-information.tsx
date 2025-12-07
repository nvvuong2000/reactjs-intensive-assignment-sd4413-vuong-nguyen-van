import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../../contexts/UserDataContext';
import { useAppSelector } from '../../../store/hooks';
import { ReviewData } from '../../../store/slices/reviewSlice';
import api from '../../../services/api';

interface PersonalInfo {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    birthDate: string;
    organization: string;
    role: string;
    department: string;
    postalCode: string;
    profileImage?: string;
}

const PersonalInformation = () => {
    const { id: urlUserId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const currentUser = useAppSelector(state => state.auth.user);
    const isOfficer = currentUser?.role === 'officer';
    const { reviewData: globalReviewData } = useAppSelector(state => state.review);

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        address: '',
        email: '',
        phone: '',
        birthDate: '',
        organization: '',
        role: '',
        department: '',
        postalCode: '',
        profileImage: ''
    });

    const [localReviewData, setLocalReviewData] = useState<{status: 'pending' | 'approved' | 'rejected', reviewedAt: string, reviewedBy: string} | null>(null);

    const { data: fetchedUser, isLoading, error } = useQuery<User>({
        queryKey: ['user', urlUserId],
        queryFn: async () => {
            if (!urlUserId) return null;
            const response = await api.get(`/users/${urlUserId}`);
            return response.data;
        },
        enabled: !!urlUserId,
    });

    useEffect(() => {
        if (fetchedUser) {
            const savedData = localStorage.getItem(`personalInfo_${urlUserId}`);
            const parsed = savedData ? JSON.parse(savedData) : null;
            if (parsed) {
                setPersonalInfo(parsed);
            } else {
                setPersonalInfo({
                    firstName: fetchedUser.firstName || '',
                    lastName: fetchedUser.lastName || '',
                    country: fetchedUser.address?.country || '',
                    city: fetchedUser.address?.city || '',
                    address: fetchedUser.address?.address || '',
                    email: fetchedUser.email || '',
                    phone: fetchedUser.phone || '',
                    birthDate: fetchedUser.birthDate || '',
                    organization: fetchedUser.company?.name || '',
                    role: fetchedUser.company?.title || '',
                    department: fetchedUser.company?.department || '',
                    postalCode: fetchedUser.address?.postalCode || '',
                    profileImage: fetchedUser.image || ''
                });
            }
        }
    }, [fetchedUser, urlUserId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem(`personalInfo_${urlUserId}`, JSON.stringify(personalInfo));
        alert('Personal information saved to localStorage!');
    };

    const handleChange = (field: keyof PersonalInfo, value: string) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target?.result as string;
                const updatedInfo = { ...personalInfo, profileImage: imageData };
                setPersonalInfo(updatedInfo);
                localStorage.setItem(`personalInfo_${urlUserId}`, JSON.stringify(updatedInfo));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        const updatedInfo = { ...personalInfo, profileImage: '' };
        setPersonalInfo(updatedInfo);
        localStorage.setItem(`personalInfo_${urlUserId}`, JSON.stringify(updatedInfo));
    };

    const displayUser = fetchedUser;
    const isOwnProfile = currentUser?.id === displayUser?.id;
    const readOnly = !isOwnProfile;

    const [reviewData, setReviewData] = useState<{status: string, reviewedAt?: string, reviewedBy?: string} | null>(null);

    useEffect(() => {
        if (urlUserId) {
            const userId = parseInt(urlUserId);
            setLocalReviewData(globalReviewData[userId] || null);
        }
    }, [urlUserId, globalReviewData]);

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
    
    if (isLoading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Failed to load user info</div>;

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
                                <a href="#"
                                   className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                            </div>
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
                                      aria-current="page">Personal Information</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Personal Information {isOfficer && `(Viewing User ${urlUserId})`}
                </h1>
                {localReviewData && (
                    <div className="mt-2">
                        <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${getStatusColor(localReviewData.status)}`}>
                            KYC Status: {localReviewData.status.toUpperCase()}
                        </span>
                        {localReviewData.reviewedBy && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                                Reviewed by {localReviewData.reviewedBy} on {localReviewData.reviewedAt ? new Date(localReviewData.reviewedAt).toLocaleDateString() : ''}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                    <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                         src={personalInfo.profileImage || "/images/users/bonnie-green-2x.png"} alt="Profile picture"/>
                    <div>
                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Profile
                            picture</h3>
                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            JPG, GIF or PNG. Max size of 800K
                        </div>
                        {isOwnProfile && (
                            <div className="flex items-center space-x-4">
                                <label htmlFor="profile-image-upload" className="cursor-pointer">
                                    <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                                        </svg>
                                        Upload picture
                                    </div>
                                    <input
                                        id="profile-image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <button 
                                    type="button"
                                    onClick={handleImageDelete}
                                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">General information</h3>
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={readOnly}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                                    Name</label>
                                    <input type="text" name="first-name" id="first-name"
                                        value={personalInfo.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                        placeholder="First Name" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                                    Name</label>
                                    <input type="text" name="last-name" id="last-name"
                                        value={personalInfo.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                        placeholder="Last Name" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="country"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                    <input type="text" name="country" id="country"
                                        value={personalInfo.country}
                                        onChange={(e) => handleChange('country', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="United States" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="city"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                    <input type="text" name="city" id="city"
                                        value={personalInfo.city}
                                        onChange={(e) => handleChange('city', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="e.g. San Francisco" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input type="text" name="address" id="address"
                                        value={personalInfo.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="e.g. California" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email"
                                        value={personalInfo.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="example@company.com" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone-number"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                                    Number</label>
                                    <input type="text" name="phone-number" id="phone-number"
                                        value={personalInfo.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="e.g. +(12)3456 789" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="birthday"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                                    <input type="text" name="birthday" id="birthday"
                                        value={personalInfo.birthDate}
                                        onChange={(e) => handleChange('birthDate', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="15/08/1990" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="organization"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organization</label>
                                    <input type="text" name="organization" id="organization"
                                        value={personalInfo.organization}
                                        onChange={(e) => handleChange('organization', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Company Name" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                    <input type="text" name="role" id="role"
                                        value={personalInfo.role}
                                        onChange={(e) => handleChange('role', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="React Developer" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="department"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                    <input type="text" name="department" id="department"
                                        value={personalInfo.department}
                                        onChange={(e) => handleChange('department', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Development" required readOnly={readOnly}/>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="zip-code"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip/postal
                                    code</label>
                                    <input type="number" name="zip-code" id="zip-code"
                                        value={personalInfo.postalCode}
                                        onChange={(e) => handleChange('postalCode', e.target.value)}
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="123456" required readOnly={readOnly}/>
                            </div>
                        </div>
                    </fieldset>
                    <div className="col-span-6 sm:col-full mt-4">
                        {isOwnProfile && <>
                            <button
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                type="submit">Edit
                            </button>
                        </>}
                        <button
                            className="ml-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            type="button" onClick={() => navigate(`/pages/user/${urlUserId}/kyc`, { state: { userData: { ...fetchedUser, ...personalInfo, address: fetchedUser?.address, image: personalInfo.profileImage } } })}>KYC
                        </button>
                    </div>
                  

                </form>
            </div>
        </div>
    )
}

export default PersonalInformation;