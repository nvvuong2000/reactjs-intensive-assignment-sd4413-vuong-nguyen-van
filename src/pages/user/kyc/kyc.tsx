import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../store/hooks';
import BasicInfoSection from './components/BasicInfoSection';
import AddressesSection from './components/AddressesSection';
import EmailsSection from './components/EmailsSection';
import PhonesSection from './components/PhonesSection';
import IdentificationDocumentsSection from './components/IdentificationDocumentsSection';
import OccupationsSection from './components/OccupationsSection';
import IncomesSection from './components/IncomesSection';
import AssetsSection from './components/AssetsSection';
import LiabilitiesSection from './components/LiabilitiesSection';
import SourceOfWealthSection from './components/SourceOfWealthSection';
import NetWorthSection from './components/NetWorthSection';
import InvestmentExperienceSection from './components/InvestmentExperienceSection';

interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
}

interface Email {
    address: string;
    type: string;
    preferred: string;
}

interface Phone {
    number: string;
    type: string;
    preferred: string;
}

interface IdDoc {
    type: string;
    number: string;
    expiryDate: string;
    upload: string;
}

interface Occupation {
    occupation: string;
    fromDate: string;
    toDate: string;
}

interface Income {
    type: string;
    amount: string;
}

interface Asset {
    type: string;
    amount: string;
}

interface Liability {
    type: string;
    amount: string;
}

interface Source {
    type: string;
    amount: string;
}

interface BasicInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    dob: string;
    age: string;
}

interface Investment {
    experience: string;
    riskTolerance: string;
}

const UserKYC = () => {
    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        age: ''
    });

    const [addresses, setAddresses] = useState<Address[]>([{ country: '', city: '', street: '', postalCode: '' }]);
    const [emails, setEmails] = useState<Email[]>([{ address: '', type: '', preferred: '' }]);
    const [phones, setPhones] = useState<Phone[]>([{ number: '', type: '', preferred: '' }]);
    const [idDocs, setIdDocs] = useState<IdDoc[]>([{ type: '', number: '', expiryDate: '', upload: '' }]);
    const [occupations, setOccupations] = useState<Occupation[]>([{ occupation: '', fromDate: '', toDate: '' }]);
    const [incomes, setIncomes] = useState<Income[]>([{ type: '', amount: '' }]);
    const [assets, setAssets] = useState<Asset[]>([{ type: '', amount: '' }]);
    const [liabilities, setLiabilities] = useState<Liability[]>([{ type: '', amount: '' }]);
    const [sources, setSources] = useState<Source[]>([{ type: '', amount: '' }]);

    const totalAssets = assets.reduce((sum, asset) => sum + parseFloat(asset.amount || '0'), 0);
    const totalLiabilities = liabilities.reduce((sum, liab) => sum + parseFloat(liab.amount || '0'), 0);
    const [investment, setInvestment] = useState<Investment>({
        experience: '',
        riskTolerance: ''
    });

    type ListItem = Record<string, any>;
    type SetListFn<T> = React.Dispatch<React.SetStateAction<T[]>>;

    const handleChange = <T extends ListItem>(
        list: T[],
        setList: SetListFn<T>,
        index: number,
        field: keyof T,
        value: T[keyof T]
    ) => {
        const updated = [...list];
        updated[index][field] = value;
        setList(updated);
    };

    const addRow = <T extends ListItem>(
        list: T[],
        setList: SetListFn<T>,
        template: T
    ) => {
        setList([...list, template]);
    };

    const removeRow = <T extends ListItem>(
        list: T[],
        setList: SetListFn<T>,
        index: number
    ) => {
        setList(list.filter((_, i) => i !== index));
    };

    const handleBasicInfoChange = (field: keyof BasicInfo, value: string) => {
        setBasicInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleInvestmentChange = (field: keyof Investment, value: string) => {
        setInvestment(prev => ({ ...prev, [field]: value }));
    };

    const { user } = useAppSelector(state => state.auth);
    const { id: urlUserId } = useParams<{ id: string }>();
    const location = useLocation();

    const currentUser = user;
    const isOfficer = currentUser?.role === 'officer';
            const fetchedUser = location.state?.userData;
        const { data: apiUser, isLoading: isApiLoading } = useQuery({
        queryKey: ['user', urlUserId],
        queryFn: async () => {
            if (!urlUserId || fetchedUser) return null;
            const res = await fetch(`https://dummyjson.com/users/${urlUserId}`);
            if (!res.ok) throw new Error('Failed to fetch user');
            return res.json();
        },
        enabled: !!urlUserId && !fetchedUser,
    });

    const userData = fetchedUser || apiUser;

    useEffect(() => {
        const savedKycData = localStorage.getItem(`kycData_${userData?.id}`);
        const parsed = savedKycData ? JSON.parse(savedKycData) : null;
        if (parsed) {
            setBasicInfo(parsed.basicInfo || basicInfo);
            setAddresses(parsed.addresses || addresses);
            setEmails(parsed.emails || emails);
            setPhones(parsed.phones || phones);
            setIdDocs(parsed.idDocs || idDocs);
            setOccupations(parsed.occupations || occupations);
            setIncomes(parsed.incomes || incomes);
            setAssets(parsed.assets || assets);
            setLiabilities(parsed.liabilities || liabilities);
            setSources(parsed.sources || sources);
            setInvestment(parsed.investment || investment);
        } else if (userData) {
            setBasicInfo({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                middleName: userData.maidenName || '',
                dob: userData.birthDate || '',
                age: userData.age?.toString() || ''
            });

            if (userData.address) {
                setAddresses([{
                    country: userData.address.state || '',
                    city: userData.address.city || '',
                    street: userData.address.address || '',
                    postalCode: userData.address.postalCode || ''
                }]);
            }

            if (userData.email) {
                setEmails([{
                    address: userData.email,
                    type: 'personal',
                    preferred: 'yes'
                }]);
            }

            if (userData.phone) {
                setPhones([{
                    number: userData.phone,
                    type: 'mobile',
                    preferred: 'yes'
                }]);
            }
        }
    }, [userData]);

;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

    const isOwnProfile = currentUser?.id === userData?.id;
    const readOnly = !isOwnProfile;
    if (isApiLoading) return <div className="p-8 text-center">Loading user data...</div>;

    return (
        <>
            <BasicInfoSection
                basicInfo={basicInfo}
                onChange={handleBasicInfoChange}
                readOnly={readOnly}
            />
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Contact Information</h3>
                <form  className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <AddressesSection
                        addresses={addresses}
                        onChange={(index, field, value) => handleChange(addresses, setAddresses, index, field, value)}
                        onAdd={() => addRow(addresses, setAddresses, { country: '', city: '', street: '', postalCode: '' })}
                        onDelete={(index) => removeRow(addresses, setAddresses, index)}
                        readOnly={readOnly}
                    />
                    <EmailsSection
                        emails={emails}
                        onChange={(index, field, value) => handleChange(emails, setEmails, index, field, value)}
                        onAdd={() => addRow(emails, setEmails, { address: '', type: '', preferred: '' })}
                        onDelete={(index) => removeRow(emails, setEmails, index)}
                        readOnly={readOnly}
                    />
                    <PhonesSection
                        phones={phones}
                        onChange={(index, field, value) => handleChange(phones, setPhones, index, field, value)}
                        onAdd={() => addRow(phones, setPhones, { number: '', type: '', preferred: '' })}
                        onDelete={(index) => removeRow(phones, setPhones, index)}
                        readOnly={readOnly}
                    />
                    <IdentificationDocumentsSection
                        idDocs={idDocs}
                        onChange={(index, field, value) => handleChange(idDocs, setIdDocs, index, field, value)}
                        onAdd={() => addRow(idDocs, setIdDocs, { type: '', number: '', expiryDate: '', upload: '' })}
                        onDelete={(index) => removeRow(idDocs, setIdDocs, index)}
                        readOnly={readOnly}
                    />
                    <OccupationsSection
                        occupations={occupations}
                        onChange={(index, field, value) => handleChange(occupations, setOccupations, index, field, value)}
                        onAdd={() => addRow(occupations, setOccupations, { occupation: '', fromDate: '', toDate: '' })}
                        onDelete={(index) => removeRow(occupations, setOccupations, index)}
                        readOnly={readOnly}
                    />
                    <IncomesSection
                        incomes={incomes}
                        onChange={(index, field, value) => handleChange(incomes, setIncomes, index, field, value)}
                        onAdd={() => addRow(incomes, setIncomes, { type: '', amount: '' })}
                        onDelete={(index) => removeRow(incomes, setIncomes, index)}
                        readOnly={readOnly}
                    />
                    <AssetsSection
                        assets={assets}
                        onChange={(index, field, value) => handleChange(assets, setAssets, index, field, value)}
                        onAdd={() => addRow(assets, setAssets, { type: '', amount: '' })}
                        onDelete={(index) => removeRow(assets, setAssets, index)}
                        readOnly={readOnly}
                    />

                    <LiabilitiesSection
                        liabilities={liabilities}
                        onChange={(index, field, value) => handleChange(liabilities, setLiabilities, index, field, value)}
                        onAdd={() => addRow(liabilities, setLiabilities, { type: '', amount: '' })}
                        onDelete={(index) => removeRow(liabilities, setLiabilities, index)}
                        readOnly={readOnly}
                    />
                    <SourceOfWealthSection
                        sources={sources}
                        onChange={(index, field, value) => handleChange(sources, setSources, index, field, value)}
                        onAdd={() => addRow(sources, setSources, { type: '', amount: '' })}
                        onDelete={(index) => removeRow(sources, setSources, index)}
                        readOnly={readOnly}
                    />
                    <NetWorthSection
                        totalAssets={totalAssets}
                        totalLiabilities={totalLiabilities}
                        readOnly={readOnly}
                    />
                    <InvestmentExperienceSection
                        investment={investment}
                        onChange={(field, value) => setInvestment(prev => ({ ...prev, [field]: value }))}
                        readOnly={readOnly}
                    />
                     <button type="submit" disabled={readOnly} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                </form>
            </div>

        </>

    );
}

export default UserKYC;