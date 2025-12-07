import { useState, useRef } from 'react';
import { ExperienceLevel, RiskTolerance } from '../constants';
import { Address, Email, Phone, IdDoc, Occupation, Income, Asset, Liability, Source, BasicInfo } from '../types';

export const useKYCState = () => {
    const [basicInfo, setBasicInfo] = useState<BasicInfo>({
        firstName: '',
        lastName: '',
        middleName: '',
        dob: '',
        age: ''
    });

    const [addresses, setAddresses] = useState<Address[]>([{ country: '', city: '', street: '', state: '', stateCode: '', postalCode: '', type: 'Mailing' }]);
    const [emails, setEmails] = useState<Email[]>([{ address: '', type: 'Personal', preferred: false }]);
    const [phones, setPhones] = useState<Phone[]>([{ number: '', type: 'Personal', preferred: false }]);
    const [idDocs, setIdDocs] = useState<IdDoc[]>([{ type: '', number: '', expiryDate: '', upload: '' }]);
    const [occupations, setOccupations] = useState<Occupation[]>([{ occupation: '', fromDate: '', toDate: '' }]);
    const [incomes, setIncomes] = useState<Income[]>([{ type: 'Salary', amount: '' }]);
    const [assets, setAssets] = useState<Asset[]>([{ type: 'Liquidity', amount: '' }]);
    const [liabilities, setLiabilities] = useState<Liability[]>([{ type: 'Personal Loan', amount: '' }]);
    const [sources, setSources] = useState<Source[]>([{ type: 'Inheritance', amount: '' }]);
    const [investment, setInvestment] = useState({
        experience: '<5 years' as ExperienceLevel,
        riskTolerance: '10%' as RiskTolerance
    });

    const [errors, setErrors] = useState<any>({});

    const basicInfoRef = useRef<HTMLDivElement>(null);
    const addressesRef = useRef<HTMLDivElement>(null);
    const emailsRef = useRef<HTMLDivElement>(null);
    const phonesRef = useRef<HTMLDivElement>(null);
    const idDocsRef = useRef<HTMLDivElement>(null);
    const occupationsRef = useRef<HTMLDivElement>(null);
    const incomesRef = useRef<HTMLDivElement>(null);
    const assetsRef = useRef<HTMLDivElement>(null);
    const liabilitiesRef = useRef<HTMLDivElement>(null);
    const sourcesRef = useRef<HTMLDivElement>(null);
    const investmentRef = useRef<HTMLDivElement>(null);

    return {
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
    };
};