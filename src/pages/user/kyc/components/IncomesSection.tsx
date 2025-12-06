import React from 'react';

interface Income {
    type: string;
    amount: string;
}

interface IncomesSectionProps {
    incomes: Income[];
    onChange: (index: number, field: keyof Income, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    readOnly?: boolean;
}

const IncomesSection: React.FC<IncomesSectionProps> = ({ incomes, onChange, onAdd, onDelete, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Incomes (A)</legend>
            <div className="panel">
                {incomes.map((income, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Income #{index + 1} {!readOnly && <button type="button" onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`income-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`income-type-${index}`}
                                    value={income.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="salary">Salary</option>
                                    <option value="investment">Investment</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`income-amount-${index}`} className="block text-sm font-medium">Amount (Currency)</label>
                                <input
                                    type="number"
                                    id={`income-amount-${index}`}
                                    value={income.amount}
                                    onChange={(e) => onChange(index, 'amount', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter amount"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={onAdd} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Income</button>}
        </fieldset>
    );
};

export default IncomesSection;