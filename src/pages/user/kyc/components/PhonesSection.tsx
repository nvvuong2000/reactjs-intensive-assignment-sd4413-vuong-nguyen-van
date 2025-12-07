import React from 'react';

type ContactType = 'Work' | 'Personal';

interface Phone {
    number: string;
    type: ContactType;
    preferred: boolean;
}

interface PhonesSectionProps {
    phones: Phone[];
    onChange: (index: number, field: keyof Phone, value: string | boolean) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    readOnly?: boolean;
}

const PhonesSection: React.FC<PhonesSectionProps> = ({ phones, onChange, onAdd, onRemove, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Phones</legend>
            <div className="panel">
                {phones.map((phone, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Phone #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`phone-number-${index}`} className="block text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    id={`phone-number-${index}`}
                                    value={phone.number}
                                    onChange={(e) => onChange(index, 'number', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter phone number"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.number && <p className="mt-1 text-sm text-red-600">{errors[index].number}</p>}
                            </div>
                            <div>
                                <label htmlFor={`phone-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`phone-type-${index}`}
                                    value={phone.type}
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
                                <label htmlFor={`phone-preferred-${index}`} className="block text-sm font-medium">Preferred</label>
                                <select
                                    id={`phone-preferred-${index}`}
                                    value={phone.preferred.toString()}
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
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Phone</button>}
        </fieldset>
    );
};

export default PhonesSection;