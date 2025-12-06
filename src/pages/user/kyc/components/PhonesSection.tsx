import React from 'react';

interface Phone {
    number: string;
    type: string;
    preferred: string;
}

interface PhonesSectionProps {
    phones: Phone[];
    onChange: (index: number, field: keyof Phone, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    readOnly?: boolean;
}

const PhonesSection: React.FC<PhonesSectionProps> = ({ phones, onChange, onAdd, onDelete, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Phones</legend>
            <div className="panel">
                {phones.map((phone, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Phone #{index + 1} {!readOnly && <button type="button" onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`phone-number-${index}`} className="block text-sm font-medium">Phone Number</label>
                                <input
                                    type="text"
                                    id={`phone-number-${index}`}
                                    value={phone.number}
                                    onChange={(e) => onChange(index, 'number', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter phone number"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`phone-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`phone-type-${index}`}
                                    value={phone.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="bond">Bond</option>
                                    <option value="liquidity">Liquidity</option>
                                    <option value="real-estate">Real Estate</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor={`phone-preferred-${index}`} className="block text-sm font-medium">Preferred</label>
                                <input
                                    type="text"
                                    id={`phone-preferred-${index}`}
                                    value={phone.preferred}
                                    onChange={(e) => onChange(index, 'preferred', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter preferred"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={onAdd} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Phone</button>}
        </fieldset>
    );
};

export default PhonesSection;