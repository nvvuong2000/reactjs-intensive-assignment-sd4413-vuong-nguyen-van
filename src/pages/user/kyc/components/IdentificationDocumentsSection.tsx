import React from 'react';

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
    onDelete: (index: number) => void;
    readOnly?: boolean;
}

const IdentificationDocumentsSection: React.FC<IdentificationDocumentsSectionProps> = ({ idDocs, onChange, onAdd, onDelete, readOnly = false }) => {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">Identification Documents</legend>
            <div className="panel">
                {idDocs.map((doc, index) => (
                    <fieldset key={index} className="border border-gray-300 rounded-md p-4 mb-6">
                        <legend className="text-md font-medium text-gray-700 px-2">
                            Document #{index + 1} {!readOnly && <button type="button" onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>}
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            <div>
                                <label htmlFor={`document-type-${index}`} className="block text-sm font-medium">Type</label>
                                <select
                                    id={`document-type-${index}`}
                                    value={doc.type}
                                    onChange={(e) => onChange(index, 'type', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    disabled={readOnly}
                                >
                                    <option value="passport">Passport</option>
                                    <option value="id-card">ID Card</option>
                                    <option value="drivers-license">Driver's License</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor={`document-number-${index}`} className="block text-sm font-medium">Number</label>
                                <input
                                    type="text"
                                    id={`document-number-${index}`}
                                    value={doc.number}
                                    onChange={(e) => onChange(index, 'number', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter document number"
                                    required
                                    readOnly={readOnly}
                                />
                            </div>
                            <div>
                                <label htmlFor={`document-expiry-date-${index}`} className="block text-sm font-medium">Expiry Date</label>
                                <input
                                    type="date"
                                    id={`document-expiry-date-${index}`}
                                    value={doc.expiryDate}
                                    onChange={(e) => onChange(index, 'expiryDate', e.target.value)}
                                    className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                    placeholder="Enter expiry date"
                                    required
                                    readOnly={readOnly}
                                />
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
                                        // Store file name instead of the file object
                                        onChange(index, 'upload', file.name);
                                    }
                                }}
                                className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color ${readOnly ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}`}
                                required
                                disabled={readOnly}
                            />
                            {doc.upload && (
                                <p className="mt-1 text-sm text-gray-600">Selected: {doc.upload}</p>
                            )}
                        </div>
                    </fieldset>
                ))}
            </div>
            {!readOnly && <button type="button" onClick={onAdd} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4">Add Identification Document</button>}
        </fieldset>
    );
};

export default IdentificationDocumentsSection;