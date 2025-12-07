import React from 'react';

interface Investment {
    experience: string;
    riskTolerance: string;
}

interface InvestmentExperienceSectionProps {
    investment: Investment;
    onChange: (field: keyof Investment, value: string) => void;
    errors: any;
    readOnly?: boolean;
}

const InvestmentExperienceSection: React.FC<InvestmentExperienceSectionProps> = ({ investment, onChange, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Investment Experience and Objectives</legend>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="investment-experience" className="block text-sm font-medium">Experience in Financial Markets</label>
                    <select
                        id="investment-experience"
                        value={investment.experience}
                        onChange={(e) => onChange('experience', e.target.value)}
                        className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${errors.experience ? 'border-red-500' : ''} ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                        disabled={readOnly}
                    >
                        <option value="<5-years">&lt; 5 years</option>
                        <option value="5-10-years">&gt; 5 and &lt; 10 years</option>
                        <option value=">10-years">&gt; 10 years</option>
                    </select>
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                </div>
                <div>
                    <label htmlFor="risk-tolerance" className="block text-sm font-medium">Risk Tolerance</label>
                    <select
                        id="risk-tolerance"
                        value={investment.riskTolerance}
                        onChange={(e) => onChange('riskTolerance', e.target.value)}
                        className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${errors.riskTolerance ? 'border-red-500' : ''} ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                        disabled={readOnly}
                    >
                        <option value="10%">10%</option>
                        <option value="30%">30%</option>
                        <option value="all-in">All-in</option>
                    </select>
                    {errors.riskTolerance && <p className="text-red-500 text-sm mt-1">{errors.riskTolerance}</p>}
                </div>
            </div>
        </fieldset>
    );
};

export default InvestmentExperienceSection;