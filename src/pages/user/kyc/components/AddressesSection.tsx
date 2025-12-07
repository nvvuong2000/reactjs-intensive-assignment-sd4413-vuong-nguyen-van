import React from 'react';
type AddressType = 'Mailing' | 'Work';

interface Address {
    country: string;
    city: string;
    street: string;
    state: string;
    stateCode: string;
    postalCode: string;
    type: AddressType;
}

interface AddressesSectionProps {
    addresses: Address[];
    onChange: (index: number, field: keyof Address, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    readOnly?: boolean;
}

const AddressesSection: React.FC<AddressesSectionProps> = ({ addresses, onChange, onAdd, onRemove, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Addresses</legend>
            <div className="panel">
                {addresses.map((address, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Address #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`country-${index}`} className="block text-sm font-medium">Country</label>
                                <input
                                    type="text"
                                    id={`country-${index}`}
                                    value={address.country}
                                    onChange={(e) => onChange(index, 'country', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter country"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.country && <p className="mt-1 text-sm text-red-600">{errors[index].country}</p>}
                            </div>
                            <div>
                                <label htmlFor={`city-${index}`} className="block text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    id={`city-${index}`}
                                    value={address.city}
                                    onChange={(e) => onChange(index, 'city', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter city"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.city && <p className="mt-1 text-sm text-red-600">{errors[index].city}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor={`state-${index}`} className="block text-sm font-medium">State</label>
                                <input
                                    type="text"
                                    id={`state-${index}`}
                                    value={address.state}
                                    onChange={(e) => onChange(index, 'state', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter state"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.state && <p className="mt-1 text-sm text-red-600">{errors[index].state}</p>}
                            </div>
                            <div>
                                <label htmlFor={`state-code-${index}`} className="block text-sm font-medium">State Code</label>
                                <input
                                    type="text"
                                    id={`state-code-${index}`}
                                    value={address.stateCode}
                                    onChange={(e) => onChange(index, 'stateCode', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.stateCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter state code"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.stateCode && <p className="mt-1 text-sm text-red-600">{errors[index].stateCode}</p>}
                            </div>
                            <div>
                                <label htmlFor={`postal-code-${index}`} className="block text-sm font-medium">Postal Code</label>
                                <input
                                    type="text"
                                    id={`postal-code-${index}`}
                                    value={address.postalCode}
                                    onChange={(e) => onChange(index, 'postalCode', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter postal code"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.postalCode && <p className="mt-1 text-sm text-red-600">{errors[index].postalCode}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            <div>
                                <label htmlFor={`street-${index}`} className="block text-sm font-medium">Street</label>
                                <input
                                    type="text"
                                    id={`street-${index}`}
                                    value={address.street}
                                    onChange={(e) => onChange(index, 'street', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.street ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter street"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.street && <p className="mt-1 text-sm text-red-600">{errors[index].street}</p>}
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Address</button>}
        </fieldset>
    );
};

export default AddressesSection;