import React from 'react';
type ContactType = 'Work' | 'Personal';

interface Email {
    address: string;
    type: ContactType;
    preferred: boolean;
}

interface EmailsSectionProps {
    emails: Email[];
    onChange: (index: number, field: keyof Email, value: string | boolean) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    readOnly?: boolean;
}

const EmailsSection: React.FC<EmailsSectionProps> = ({ emails, onChange, onAdd, onRemove, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Emails</legend>
            <div className="panel">
                {emails.map((email, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Email #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`email-address-${index}`} className="block text-sm font-medium">Email Address</label>
                                <input
                                    type="email"
                                    id={`email-address-${index}`}
                                    value={email.address}
                                    onChange={(e) => onChange(index, 'address', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter email address"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.address && <p className="mt-1 text-sm text-red-600">{errors[index].address}</p>}
                            </div>
                            <div>
                                <label htmlFor={`email-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`email-type-${index}`}
                                    value={email.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="Personal">Personal</option>
                                    <option value="Work">Work</option>
                                </select>
                                {errors[index]?.type && <p className="mt-1 text-sm text-red-600">{errors[index].type}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor={`email-preferred-${index}`} className="block text-sm font-medium">Preferred</label>
                                <select
                                    id={`email-preferred-${index}`}
                                    value={email.preferred.toString()}
                                    onChange={(e) => onChange(index, 'preferred', e.target.value === 'true')}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.preferred ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                                {errors[index]?.preferred && <p className="mt-1 text-sm text-red-600">{errors[index].preferred}</p>}
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Email</button>}
        </fieldset>
    );
};

export default EmailsSection;