import React from 'react';
import { calculateNetWorth } from '../../../../utils/netWorthUtils';

interface NetWorthSectionProps {
    totalIncomes: number;
    totalAssets: number;
    totalLiabilities: number;
    totalSources: number;
    readOnly?: boolean;
}

const NetWorthSection: React.FC<NetWorthSectionProps> = ({
    totalIncomes,
    totalAssets,
    totalLiabilities,
    totalSources,
    readOnly
}) => {
    const netWorth = calculateNetWorth(totalIncomes, totalAssets, totalLiabilities, totalSources);

    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Net Worth</legend>
            <div>
                <label htmlFor="net-worth-total" className="block text-sm font-medium">Total</label>
                <input
                    type="number"
                    id="net-worth-total"
                    value={netWorth}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color bg-gray-100 cursor-not-allowed opacity-60"
                    placeholder="Automatically calculated"
                    disabled={readOnly}
                    readOnly
                />
            </div>
        </fieldset>
    );
};

export default NetWorthSection;