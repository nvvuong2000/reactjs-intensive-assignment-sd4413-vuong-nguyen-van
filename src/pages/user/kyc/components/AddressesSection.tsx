import React from 'react';

interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
}

interface AddressesSectionProps {
    addresses: Address[];
    onChange: (index: number, field: keyof Address, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    readOnly?: boolean;
}

const AddressesSection: React.FC<AddressesSectionProps> = ({ addresses, onChange, onAdd, onDelete, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Addresses</legend>
            <div className="panel">
                {addresses.map((address, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Address #{index + 1} {!readOnly && <button type="button" onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`country-${index}`} className="block text-sm font-medium">Country</label>
                                <input
                                    type="text"
                                    id={`country-${index}`}
                                    value={address.country}
                                    onChange={(e) => onChange(index, 'country', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter country"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`city-${index}`} className="block text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    id={`city-${index}`}
                                    value={address.city}
                                    onChange={(e) => onChange(index, 'city', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter city"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor={`street-${index}`} className="block text-sm font-medium">Street</label>
                                <input
                                    type="text"
                                    id={`street-${index}`}
                                    value={address.street}
                                    onChange={(e) => onChange(index, 'street', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter street"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`postal-code-${index}`} className="block text-sm font-medium">Postal Code</label>
                                <input
                                    type="text"
                                    id={`postal-code-${index}`}
                                    value={address.postalCode}
                                    onChange={(e) => onChange(index, 'postalCode', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter postal code"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={onAdd} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Address</button>}
        </fieldset>
    );
};

export default AddressesSection;