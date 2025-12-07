import React, { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../store/hooks';
import api from '../../../services/api';
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
import { formatDateToDDMMYYYY } from './utils';
import { basicInfoSchema, addressSchema, emailSchema, phoneSchema, idDocSchema, occupationSchema, incomeSchema, assetSchema, liabilitySchema, sourceSchema, investmentSchema } from './validationSchemas';
import { ContactType, AddressType, IncomeType, AssetType, LiabilityType, WealthSourceType, ExperienceLevel, RiskTolerance } from './constants';
import { Address, Email, Phone, IdDoc, Occupation, Income, Asset, Liability, Source, BasicInfo, FormData } from './types';
import { useKYCState } from './hooks/useKYCState';
import { useKYCData } from './hooks/useKYCData';
import { useKYCValidation } from './hooks/useKYCValidation';
import { useKYCSubmission } from './hooks/useKYCSubmission';
import { handleChange, addRow, removeRow } from './utils/arrayUtils';
import { calculateTotals } from './utils/calculationUtils';
import { scrollToFirstError } from './utils/errorUtils';

const UserKYC = () => {
    const { id: urlUserId } = useParams<{ id: string }>();
    const {
        basicInfo,
        setBasicInfo,
        addresses,
        setAddresses,
        emails,
        setEmails,
        phones,
        setPhones,
        idDocs,
        setIdDocs,
        occupations,
        setOccupations,
        incomes,
        setIncomes,
        assets,
        setAssets,
        liabilities,
        setLiabilities,
        sources,
        setSources,
        investment,
        setInvestment,
        errors,
        setErrors,
        basicInfoRef,
        addressesRef,
        emailsRef,
        phonesRef,
        idDocsRef,
        occupationsRef,
        incomesRef,
        assetsRef,
        liabilitiesRef,
        sourcesRef,
        investmentRef
    } = useKYCState();

    const { userData, isApiLoading } = useKYCData({
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
    });

    const { validateForm } = useKYCValidation({
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
    });

    const { onFormSubmit } = useKYCSubmission({
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
        scrollToFirstError: (errors) => scrollToFirstError(
            errors,
            basicInfoRef,
            addressesRef,
            emailsRef,
            phonesRef,
            idDocsRef,
            occupationsRef,
            incomesRef,
            assetsRef,
            liabilitiesRef,
            sourcesRef,
            investmentRef
        )
    });

    const { totalIncomes, totalLiabilities, totalSources, totalAssets } = calculateTotals(incomes, liabilities, sources, assets);

    useEffect(() => {
        if (basicInfo.dob) {
            const [day, month, year] = basicInfo.dob.split('/');
            const birthDate = new Date(`${year}-${month}-${day}`);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setBasicInfo(prev => ({ ...prev, age: age.toString() }));
        }
    }, [basicInfo.dob]);

    const { user } = useAppSelector(state => state.auth);
    const isOwnProfile = user?.id === userData?.id;
    const readOnly = !isOwnProfile;
    if (isApiLoading) return <div className="p-8 text-center">Loading user data...</div>;

    return (
        <>
            <div ref={basicInfoRef}>
                <BasicInfoSection
                    basicInfo={basicInfo}
                    onChange={(field, value) => setBasicInfo(prev => ({ ...prev, [field]: value }))}
                    errors={errors}
                    readOnly={readOnly}
                />
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold dark:text-white">Contact Information</h3>
                <form className="mt-6 space-y-6" onSubmit={onFormSubmit}>
                    <div ref={addressesRef}>
                        <AddressesSection
                            addresses={addresses}
                            onChange={(index, field, value) => handleChange(addresses, setAddresses, index, field, value, addressSchema, 'addresses', errors, setErrors)}
                            onAdd={() => addRow(addresses, setAddresses, { country: '', city: '', street: '', state: '', stateCode: '', postalCode: '', type: 'Mailing' })}
                            onRemove={(index) => removeRow(addresses, setAddresses, index)}
                            errors={errors.addresses || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={emailsRef}>
                        <EmailsSection
                            emails={emails}
                            onChange={(index, field, value) => handleChange(emails, setEmails, index, field, value, emailSchema, 'emails', errors, setErrors)}
                            onAdd={() => addRow(emails, setEmails, { address: '', type: 'Personal', preferred: false })}
                            onRemove={(index) => removeRow(emails, setEmails, index)}
                            errors={errors.emails || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={phonesRef}>
                        <PhonesSection
                            phones={phones}
                            onChange={(index, field, value) => handleChange(phones, setPhones, index, field, value, phoneSchema, 'phones', errors, setErrors)}
                            onAdd={() => addRow(phones, setPhones, { number: '', type: 'Personal', preferred: false })}
                            onRemove={(index) => removeRow(phones, setPhones, index)}
                            errors={errors.phones || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={idDocsRef}>
                        <IdentificationDocumentsSection
                            idDocs={idDocs}
                            onChange={(index, field, value) => handleChange(idDocs, setIdDocs, index, field, value, idDocSchema, 'idDocs', errors, setErrors)}
                            onAdd={() => addRow(idDocs, setIdDocs, { type: '', number: '', expiryDate: '', upload: '' })}
                            onRemove={(index) => removeRow(idDocs, setIdDocs, index)}
                            errors={errors.idDocs || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={occupationsRef}>
                        <OccupationsSection
                            occupations={occupations}
                            onChange={(index, field, value) => handleChange(occupations, setOccupations, index, field, value, occupationSchema, 'occupations', errors, setErrors)}
                            onAdd={() => addRow(occupations, setOccupations, { occupation: '', fromDate: '', toDate: '' })}
                            onRemove={(index) => removeRow(occupations, setOccupations, index)}
                            errors={errors.occupations || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={incomesRef}>
                        <IncomesSection
                            incomes={incomes}
                            onChange={(index, field, value) => handleChange(incomes, setIncomes, index, field, value, incomeSchema, 'incomes', errors, setErrors)}
                            onAdd={() => addRow(incomes, setIncomes, { type: 'Salary', amount: '' })}
                            onRemove={(index) => removeRow(incomes, setIncomes, index)}
                            errors={errors.incomes || []}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={assetsRef}>
                        <AssetsSection
                            assets={assets}
                            onChange={(index, field, value) => handleChange(assets, setAssets, index, field, value, assetSchema, 'assets', errors, setErrors)}
                            onAdd={() => addRow(assets, setAssets, { type: 'Liquidity', amount: '' })}
                            onRemove={(index) => removeRow(assets, setAssets, index)}
                        />
                    </div>
                    <div ref={liabilitiesRef}>
                        <LiabilitiesSection
                            liabilities={liabilities}
                            onChange={(index, field, value) => handleChange(liabilities, setLiabilities, index, field, value, liabilitySchema, 'liabilities', errors, setErrors)}
                            onAdd={() => addRow(liabilities, setLiabilities, { type: 'Personal Loan', amount: '' })}
                            onRemove={(index) => removeRow(liabilities, setLiabilities, index)}
                            errors={errors.liabilities || []}
                            totalLiabilities={totalLiabilities}
                            readOnly={readOnly}
                        />
                    </div>
                    <div ref={sourcesRef}>
                        <SourceOfWealthSection
                            sources={sources}
                            onChange={(index, field, value) => handleChange(sources, setSources, index, field, value, sourceSchema, 'sources', errors, setErrors)}
                            onAdd={() => addRow(sources, setSources, { type: 'Inheritance', amount: '' })}
                            onRemove={(index) => removeRow(sources, setSources, index)}
                            errors={errors.sources || []}
                            totalSources={totalSources}
                            readOnly={readOnly}
                        />
                    </div>
                    <NetWorthSection
                        totalIncomes={totalIncomes}
                        totalAssets={totalAssets}
                        totalLiabilities={totalLiabilities}
                        totalSources={totalSources}
                        readOnly={readOnly}
                    />
                    <div ref={investmentRef}>
                        <InvestmentExperienceSection
                            investment={investment}
                            onChange={(field, value) => setInvestment(prev => ({ ...prev, [field]: value }))}
                            errors={errors}
                            readOnly={readOnly}
                        />
                    </div>
                     <button type="submit" disabled={readOnly} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
                </form>
            </div>

        </>

    );
}

export default UserKYC;