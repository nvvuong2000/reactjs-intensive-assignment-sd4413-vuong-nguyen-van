import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Occupation {
    occupation: string;
    fromDate: string;
    toDate: string;
}

interface OccupationsSectionProps {
    occupations: Occupation[];
    onChange: (index: number, field: keyof Occupation, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    readOnly?: boolean;
}

const OccupationsSection: React.FC<OccupationsSectionProps> = ({ occupations, onChange, onAdd, onRemove, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Occupations</legend>
            <div className="panel">
                {occupations.map((occupation, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Occupation #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor={`occupation-type-${index}`} className="block text-sm font-medium">Occupation</label>
                                <input
                                    type="text"
                                    id={`occupation-type-${index}`}
                                    value={occupation.occupation}
                                    onChange={(e) => onChange(index, 'occupation', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.occupation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter occupation"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.occupation && <p className="mt-1 text-sm text-red-600">{errors[index].occupation}</p>}
                            </div>
                            <div>
                                <label htmlFor={`occupation-from-date-${index}`} className="block text-sm font-medium">From Date</label>
                                <DatePicker
                                    id={`occupation-from-date-${index}`}
                                    selected={occupation.fromDate ? (() => {
                                        const [day, month, year] = occupation.fromDate.split('/');
                                        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                    })() : null}
                                    onChange={(date) => {
                                        if (date) {
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            const year = date.getFullYear();
                                            onChange(index, 'fromDate', `${day}/${month}/${year}`);
                                        } else {
                                            onChange(index, 'fromDate', '');
                                        }
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.fromDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    readOnly={readOnly}
                                    placeholderText="Select from date"
                                />
                                {errors[index]?.fromDate && <p className="mt-1 text-sm text-red-600">{errors[index].fromDate}</p>}
                            </div>
                            <div>
                                <label htmlFor={`occupation-to-date-${index}`} className="block text-sm font-medium">To Date</label>
                                <DatePicker
                                    id={`occupation-to-date-${index}`}
                                    selected={occupation.toDate ? (() => {
                                        const [day, month, year] = occupation.toDate.split('/');
                                        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                    })() : null}
                                    onChange={(date) => {
                                        if (date) {
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            const year = date.getFullYear();
                                            onChange(index, 'toDate', `${day}/${month}/${year}`);
                                        } else {
                                            onChange(index, 'toDate', '');
                                        }
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.toDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    readOnly={readOnly}
                                    placeholderText="Select to date"
                                />
                                {errors[index]?.toDate && <p className="mt-1 text-sm text-red-600">{errors[index].toDate}</p>}
                            </div>
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Occupation</button>}
        </fieldset>
    );
};

export default OccupationsSection;