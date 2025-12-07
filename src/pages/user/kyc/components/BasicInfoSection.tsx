import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    errors: any;
    readOnly: boolean;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ basicInfo, onChange, errors, readOnly }) => {
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
                                id="first-name"
                                value={basicInfo.firstName}
                                onChange={(e) => onChange('firstName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="First Name"
                                readOnly={readOnly}
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                value={basicInfo.lastName}
                                onChange={(e) => onChange('lastName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="Last Name"
                                readOnly={readOnly}
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="middle-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                            <input
                                type="text"
                                id="middle-name"
                                value={basicInfo.middleName}
                                onChange={(e) => onChange('middleName', e.target.value)}
                                className={`shadow-sm bg-gray-50 border ${errors.middleName ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                placeholder="Middle Name"
                                readOnly={readOnly}
                            />
                            {errors.middleName && <p className="mt-1 text-sm text-red-600">{errors.middleName}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthday</label>
                            <DatePicker
                                id="birthday"
                                selected={basicInfo.dob ? (() => {
                                    const [day, month, year] = basicInfo.dob.split('/');
                                    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                })() : null}
                                onChange={(date) => {
                                    if (date) {
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();
                                        onChange('dob', `${day}/${month}/${year}`);
                                    } else {
                                        onChange('dob', '');
                                    }
                                }}
                                dateFormat="dd/MM/yyyy"
                                className={`shadow-sm bg-gray-50 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                readOnly={readOnly}
                                placeholderText="Select birthday"
                            />
                            {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                            <input
                                type="text"
                                id="age"
                                value={basicInfo.age}
                                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-gray-100 cursor-not-allowed opacity-60`}
                                placeholder="Auto-calculated"
                                readOnly
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default BasicInfoSection;