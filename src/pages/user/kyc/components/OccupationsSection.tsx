import React from 'react';

interface Occupation {
    occupation: string;
    fromDate: string;
    toDate: string;
}

interface OccupationsSectionProps {
    occupations: Occupation[];
    onChange: (index: number, field: keyof Occupation, value: string) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    readOnly?: boolean;
}

const OccupationsSection: React.FC<OccupationsSectionProps> = ({ occupations, onChange, onAdd, onDelete, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Occupations</legend>
            <div className="panel">
                {occupations.map((occ, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Occupation #{index + 1} {!readOnly && <button type="button" onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor={`occupation-type-${index}`} className="block text-sm font-medium">Occupation</label>
                                <input
                                    type="text"
                                    id={`occupation-type-${index}`}
                                    value={occ.occupation}
                                    onChange={(e) => onChange(index, 'occupation', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter occupation"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`occupation-from-date-${index}`} className="block text-sm font-medium">From Date</label>
                                <input
                                    type="date"
                                    id={`occupation-from-date-${index}`}
                                    value={occ.fromDate}
                                    onChange={(e) => onChange(index, 'fromDate', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`occupation-to-date-${index}`} className="block text-sm font-medium">To Date</label>
                                <input
                                    type="date"
                                    id={`occupation-to-date-${index}`}
                                    value={occ.toDate}
                                    onChange={(e) => onChange(index, 'toDate', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={onAdd} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Occupation</button>}
        </fieldset>
    );
};

export default OccupationsSection;