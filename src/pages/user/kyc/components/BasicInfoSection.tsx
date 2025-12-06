import React from 'react';

interface BasicInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    dob: string;
    age: string;
}

interface BasicInfoSectionProps {
    basicInfo: BasicInfo;
    onChange: (field: keyof BasicInfo, value: string) => void;
    readOnly: boolean;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ basicInfo, onChange, readOnly }) => {
    return (
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">Basic information</h3>
            <form>
                <fieldset>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                value={basicInfo.firstName}
                                onChange={(e) => onChange('firstName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="First Name"
                                required
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                value={basicInfo.lastName}
                                onChange={(e) => onChange('lastName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="Last Name"
                                required
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="middle-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                            <input
                                type="text"
                                name="middle-name"
                                id="middle-name"
                                value={basicInfo.middleName}
                                onChange={(e) => onChange('middleName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="e.g. San Francisco"
                                required
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                            <input
                                type="text"
                                name="birthday"
                                id="birthday"
                                value={basicInfo.dob}
                                onChange={(e) => onChange('dob', e.target.value)}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="15/08/1990"
                                required
                                readOnly={readOnly}
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age code</label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                value={basicInfo.age}
                                onChange={(e) => onChange('age', e.target.value)}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="123456"
                                required
                                readOnly={readOnly}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default BasicInfoSection;