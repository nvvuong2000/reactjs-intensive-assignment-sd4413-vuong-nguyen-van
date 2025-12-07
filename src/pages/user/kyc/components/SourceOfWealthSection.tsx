import React from 'react';

type WealthSourceType = 'Inheritance' | 'Donation';

interface Source {
    type: WealthSourceType;
    amount: string;
}

interface SourceOfWealthSectionProps {
    sources: Source[];
    onChange: (index: number, field: keyof Source, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    totalSources: number;
    readOnly?: boolean;
}

const SourceOfWealthSection: React.FC<SourceOfWealthSectionProps> = ({ sources, onChange, onAdd, onRemove, errors, totalSources, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Source of Wealth (D)</legend>
            <p className="text-sm mb-4 text-gray-600">
                This section identifies the origin of your wealth, such as any inheritance or donations you may have received. It's important for financial transparency.
            </p>
            <div className="panel">
                {sources.map((source, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Source #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`wealth-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`wealth-type-${index}`}
                                    value={source.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="Inheritance">Inheritance</option>
                                    <option value="Donation">Donation</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`wealth-amount-${index}`} className="block text-sm font-medium">Amount (Currency)</label>
                                <input
                                    type="number"
                                    id={`wealth-amount-${index}`}
                                    value={source.amount}
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
                <label htmlFor="wealth-total" className="block text-sm font-medium">Total Source of Wealth</label>
                <input
                    type="number"
                    id="wealth-total"
                    value={totalSources}
                    className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Calculated Total"
                    readOnly
                />
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Source of Wealth</button>}
        </fieldset>
    );
};

export default SourceOfWealthSection;