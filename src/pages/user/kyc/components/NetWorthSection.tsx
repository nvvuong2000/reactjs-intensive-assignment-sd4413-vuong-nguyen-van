import React from 'react';

interface NetWorthSectionProps {
    totalAssets: number;
    totalLiabilities: number;
     readOnly?: boolean;
}

const NetWorthSection: React.FC<NetWorthSectionProps> = ({ totalAssets, totalLiabilities, readOnly }) => {
    const netWorth = totalAssets - totalLiabilities;

    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Net Worth</legend>
            <div>
                <label htmlFor="net-worth-total" className="block text-sm font-medium">Total</label>
                <input
                    type="number"
                    id="net-worth-total"
                    value={netWorth}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                    placeholder="Automatically calculated"
                    disabled={readOnly}
                />
            </div>
        </fieldset>
    );
};

export default NetWorthSection;