import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IdDoc {
    type: string;
    number: string;
    expiryDate: string;
    upload: string;
}

interface IdentificationDocumentsSectionProps {
    idDocs: IdDoc[];
    onChange: (index: number, field: keyof IdDoc, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    errors: any[];
    readOnly?: boolean;
}

const IdentificationDocumentsSection: React.FC<IdentificationDocumentsSectionProps> = ({ idDocs, onChange, onAdd, onRemove, errors, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Identification Documents</legend>
            <div className="panel">
                {idDocs.map((idDoc, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Document #{index + 1} {!readOnly && <button type="button" onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor={`document-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`document-type-${index}`}
                                    value={idDoc.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="passport">Passport</option>
                                    <option value="id-card">ID Card</option>
                                    <option value="drivers-license">Driver's License</option>
                                    <option value="others">Others</option>
                                </select>
                                {errors[index]?.type && <p className="mt-1 text-sm text-red-600">{errors[index].type}</p>}
                            </div>
                            <div>
                                <label htmlFor={`document-number-${index}`} className="block text-sm font-medium">Number</label>
                                <input
                                    type="text"
                                    id={`document-number-${index}`}
                                    value={idDoc.number}
                                    onChange={(e) => onChange(index, 'number', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter document number"
                                    readOnly={readOnly}
                                />
                                {errors[index]?.number && <p className="mt-1 text-sm text-red-600">{errors[index].number}</p>}
                            </div>
                            <div>
                                <label htmlFor={`document-expiry-date-${index}`} className="block text-sm font-medium">Expiry Date</label>
                                <DatePicker
                                    id={`document-expiry-date-${index}`}
                                    selected={idDoc.expiryDate ? (() => {
                                        const [day, month, year] = idDoc.expiryDate.split('/');
                                        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                                    })() : null}
                                    onChange={(date) => {
                                        if (date) {
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            const year = date.getFullYear();
                                            onChange(index, 'expiryDate', `${day}/${month}/${year}`);
                                        } else {
                                            onChange(index, 'expiryDate', '');
                                        }
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className={`w-full px-4 py-2 mt-2 border ${errors[index]?.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    readOnly={readOnly}
                                    placeholderText="Select expiry date"
                                />
                                {errors[index]?.expiryDate && <p className="mt-1 text-sm text-red-600">{errors[index].expiryDate}</p>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor={`document-upload-${index}`} className="block text-sm font-medium">Upload Document</label>
                            <input
                                type="file"
                                id={`document-upload-${index}`}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onChange(index, 'upload', file.name);
                                    }
                                }}
                                className={`w-full px-4 py-2 mt-2 border ${errors[index]?.upload ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                disabled={readOnly}
                            />
                            {errors[index]?.upload && <p className="mt-1 text-sm text-red-600">{errors[index].upload}</p>}
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={() => onAdd()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Identification Document</button>}
        </fieldset>
    );
};

export default IdentificationDocumentsSection;