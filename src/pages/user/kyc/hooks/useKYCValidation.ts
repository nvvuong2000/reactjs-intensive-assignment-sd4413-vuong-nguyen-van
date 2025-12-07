import { basicInfoSchema, addressSchema, emailSchema, phoneSchema, idDocSchema, occupationSchema, incomeSchema, assetSchema, liabilitySchema, sourceSchema, investmentSchema } from '../validationSchemas';
import { BasicInfo } from '../types';

interface UseKYCValidationProps {
    basicInfo: BasicInfo;
    addresses: any[];
    emails: any[];
    phones: any[];
    idDocs: any[];
    occupations: any[];
    incomes: any[];
    assets: any[];
    liabilities: any[];
    sources: any[];
    investment: any;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
}

export const useKYCValidation = ({
    basicInfo,
    addresses,
    emails,
    phones,
    idDocs,
    occupations,
    incomes,
    assets,
    liabilities,
    sources,
    investment,
    setErrors
}: UseKYCValidationProps) => {

    const validateForm = async () => {
        const newErrors: any = {};

        try {
            await basicInfoSchema.validate(basicInfo, { abortEarly: false });
        } catch (err: any) {
            err.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
        }

        const arrayValidations = [
            { data: addresses, schema: addressSchema, key: 'addresses' },
            { data: emails, schema: emailSchema, key: 'emails' },
            { data: phones, schema: phoneSchema, key: 'phones' },
            { data: idDocs, schema: idDocSchema, key: 'idDocs' },
            { data: occupations, schema: occupationSchema, key: 'occupations' },
            { data: incomes, schema: incomeSchema, key: 'incomes' },
            { data: assets, schema: assetSchema, key: 'assets' },
            { data: liabilities, schema: liabilitySchema, key: 'liabilities' },
            { data: sources, schema: sourceSchema, key: 'sources' }
        ];

        for (const { data, schema, key } of arrayValidations) {
            const arrayErrors: any[] = [];
            for (let i = 0; i < data.length; i++) {
                try {
                    await schema.validate(data[i], { abortEarly: false });
                    arrayErrors.push({});
                } catch (err: any) {
                    const itemErrors: any = {};
                    err.inner.forEach((error: any) => {
                        itemErrors[error.path] = error.message;
                    });
                    arrayErrors.push(itemErrors);
                }
            }
            if (arrayErrors.some(errors => Object.keys(errors).length > 0)) {
                newErrors[key] = arrayErrors;
            }
        }

        try {
            await investmentSchema.validate(investment, { abortEarly: false });
        } catch (err: any) {
            err.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
        }

        setErrors(newErrors);
        return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
    };

    return { validateForm };
};