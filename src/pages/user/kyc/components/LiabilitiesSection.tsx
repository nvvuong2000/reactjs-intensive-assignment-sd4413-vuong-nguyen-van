import React from 'react';

type LiabilityType = 'Personal Loan' | 'Real Estate Loan' | 'Others';

interface Liability {
    type: LiabilityType;
    amount: string;
}

interface LiabilitiesSectionProps {
    liabilities: Liability[];
    onChange: (index: number, field: keyof Liability, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    totalLiabilities: number;
    readOnly?: boolean;
}

const LiabilitiesSection: React.FC<LiabilitiesSectionProps> = ({ liabilities, onChange, onAdd, onRemove, errors, totalLiabilities, readOnly = false }) => {

    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Liabilities (C)</legend>
            <p className="text-sm mb-4 text-gray-600">
                Liabilities are any outstanding debts or obligations you may have. These can include loans such as personal loans, mortgages, or other forms of debt.
            </p>
            <div className="panel">
                {liabilities.map((liability, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Liability #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`liability-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`liability-type-${index}`}
                                    value={liability.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="Personal Loan">Personal Loan</option>
                                    <option value="Real Estate Loan">Real Estate Loan</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`liability-amount-${index}`} className="block text-sm font-medium">Amount (Currency)</label>
                                <input
                                    type="number"
                                    id={`liability-amount-${index}`}
                                    value={liability.amount}
                                    onChange={(e) => onChange(index, 'amount', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter amount"
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            <div className="mt-4">
                <label htmlFor="liabilities-total" className="block text-sm font-medium">Total Liabilities</label>
                <input
                    type="number"
                    id="liabilities-total"
                    value={totalLiabilities}
                    className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Calculated Total"
                    readOnly
                />
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Liability</button>}
        </fieldset>
    );
};

export default LiabilitiesSection;