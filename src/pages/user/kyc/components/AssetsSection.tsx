import React from 'react';
type AssetType = 'Bond' | 'Liquidity' | 'Real Estate' | 'Others';

interface Asset {
    type: AssetType;
    amount: string;
}

interface AssetsSectionProps {
    assets: Asset[];
    onChange: (index: number, field: keyof Asset, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    readOnly?: boolean;
}

const AssetsSection: React.FC<AssetsSectionProps> = ({ assets, onChange, onAdd, onRemove, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Assets (B)</legend>
            <div className="panel">
                {assets.map((asset, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Asset #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor={`asset-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`asset-type-${index}`}
                                    value={asset.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="Bond">Bond</option>
                                    <option value="Liquidity">Liquidity</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`asset-amount-${index}`} className="block text-sm font-medium">Amount (Currency)</label>
                                <input
                                    type="number"
                                    id={`asset-amount-${index}`}
                                    value={asset.amount}
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
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Asset</button>}
        </fieldset>
    );
};

export default AssetsSection;