import { BasicInfo } from '../types';

interface UseKYCSubmissionProps {
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
    userData: any;
    validateForm: () => Promise<{ isValid: boolean; errors: any }>;
    scrollToFirstError: (errors?: any) => void;
}

export const useKYCSubmission = ({
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
    userData,
    validateForm,
    scrollToFirstError
}: UseKYCSubmissionProps) => {

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationResult = await validateForm();
        if (!validationResult.isValid) {
            scrollToFirstError(validationResult.errors);
            return;
        }

        const kycData = {
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
            investment
        };
        localStorage.setItem(`kycData_${userData?.id}`, JSON.stringify(kycData));
        alert('KYC data saved to localStorage!');
    };

    return { onFormSubmit };
};