import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../store/hooks';
import api from '../../../../services/api';
import { formatDateToDDMMYYYY } from '../utils';
import { ContactType, AddressType } from '../constants';
import { BasicInfo } from '../types';

interface UseKYCDataProps {
    urlUserId?: string;
    basicInfo: BasicInfo;
    setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfo>>;
    setAddresses: React.Dispatch<React.SetStateAction<any[]>>;
    setEmails: React.Dispatch<React.SetStateAction<any[]>>;
    setPhones: React.Dispatch<React.SetStateAction<any[]>>;
    setIdDocs: React.Dispatch<React.SetStateAction<any[]>>;
    setOccupations: React.Dispatch<React.SetStateAction<any[]>>;
    setIncomes: React.Dispatch<React.SetStateAction<any[]>>;
    setAssets: React.Dispatch<React.SetStateAction<any[]>>;
    setLiabilities: React.Dispatch<React.SetStateAction<any[]>>;
    setSources: React.Dispatch<React.SetStateAction<any[]>>;
    setInvestment: React.Dispatch<React.SetStateAction<any>>;
}

export const useKYCData = ({
    urlUserId,
    basicInfo,
    setBasicInfo,
    setAddresses,
    setEmails,
    setPhones,
    setIdDocs,
    setOccupations,
    setIncomes,
    setAssets,
    setLiabilities,
    setSources,
    setInvestment
}: UseKYCDataProps) => {
    const { user } = useAppSelector(state => state.auth);

    const { data: apiUser, isLoading: isApiLoading } = useQuery({
        queryKey: ['user', urlUserId || user?.id],
        queryFn: async () => {
            const targetUserId = urlUserId || user?.id;
            if (!targetUserId) return null;
            const response = await api.get(`/users/${targetUserId}`);
            return response.data;
        },
        enabled: !!(urlUserId || user?.id),
    });

    const userData = apiUser;

    useEffect(() => {
        const savedKycData = localStorage.getItem(`kycData_${userData?.id}`);
        const parsed = savedKycData ? JSON.parse(savedKycData) : null;
        if (parsed) {
            setBasicInfo({
                firstName: parsed.basicInfo?.firstName || '',
                lastName: parsed.basicInfo?.lastName || '',
                middleName: parsed.basicInfo?.middleName || '',
                dob: parsed.basicInfo?.dob || '',
                age: parsed.basicInfo?.age || ''
            });
            setAddresses(parsed.addresses || [{ country: '', city: '', street: '', state: '', stateCode: '', postalCode: '', type: 'Mailing' }]);
            setEmails(parsed.emails || [{ address: '', type: 'Personal', preferred: false }]);
            setPhones(parsed.phones || [{ number: '', type: 'Personal', preferred: false }]);
            setIdDocs(parsed.idDocs || [{ type: '', number: '', expiryDate: '', upload: '' }]);
            setOccupations(parsed.occupations || [{ occupation: '', fromDate: '', toDate: '' }]);
            setIncomes(parsed.incomes || [{ type: 'Salary', amount: '' }]);
            setAssets(parsed.assets || [{ type: 'Liquidity', amount: '' }]);
            setLiabilities(parsed.liabilities || [{ type: 'Personal Loan', amount: '' }]);
            setSources(parsed.sources || [{ type: 'Inheritance', amount: '' }]);
            setInvestment({
                experience: parsed.investment?.experience || '<5 years',
                riskTolerance: parsed.investment?.riskTolerance || '10%'
            });
        } else if (userData) {
            setBasicInfo({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                middleName: userData.maidenName || '',
                dob: formatDateToDDMMYYYY(userData.birthDate || ''),
                age: userData.age?.toString() || ''
            });

            if (userData.address) {
                setAddresses([{
                    country: userData.address.country || '',
                    city: userData.address.city || '',
                    street: userData.address.address || '',
                    state: userData.address.state || '',
                    stateCode: userData.address.stateCode || '',
                    postalCode: userData.address.postalCode || '',
                    type: 'Mailing' as AddressType
                }]);
            }

            if (userData.email) {
                setEmails([{
                    address: userData.email,
                    type: 'Personal' as ContactType,
                    preferred: true
                }]);
            }

            if (userData.phone) {
                setPhones([{
                    number: userData.phone,
                    type: 'Personal' as ContactType,
                    preferred: true
                }]);
            }

            setIdDocs([{ type: '', number: '', expiryDate: '', upload: '' }]);
            setOccupations([{ occupation: '', fromDate: '', toDate: '' }]);
            setIncomes([{ type: 'Salary', amount: '' }]);
            setAssets([{ type: 'Liquidity', amount: '' }]);
            setLiabilities([{ type: 'Personal Loan', amount: '' }]);
            setSources([{ type: 'Inheritance', amount: '' }]);
            setInvestment({
                experience: '<5 years',
                riskTolerance: '10%'
            });
        }
    }, [userData, setBasicInfo, setAddresses, setEmails, setPhones, setIdDocs, setOccupations, setIncomes, setAssets, setLiabilities, setSources, setInvestment]);

    return { userData, isApiLoading };
};