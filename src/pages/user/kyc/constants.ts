export const KYC_STORAGE_KEY_PREFIX = 'kycData_';

// Type constants - these represent specific values that can be used as options
export const CONTACT_TYPES = ['Work', 'Personal'] as const;
export const ADDRESS_TYPES = ['Mailing', 'Work'] as const;
export const INCOME_TYPES = ['Salary', 'Investment', 'Others'] as const;
export const ASSET_TYPES = ['Bond', 'Liquidity', 'Real Estate', 'Others'] as const;
export const LIABILITY_TYPES = ['Personal Loan', 'Real Estate Loan', 'Others'] as const;
export const WEALTH_SOURCE_TYPES = ['Inheritance', 'Donation'] as const;
export const EXPERIENCE_LEVELS = ['<5 years', '5–10 years', '>10 years'] as const;
export const RISK_TOLERANCE_LEVELS = ['10%', '30%', 'All-in'] as const;

// Type definitions derived from constants
export type ContactType = typeof CONTACT_TYPES[number];
export type AddressType = typeof ADDRESS_TYPES[number];
export type IncomeType = typeof INCOME_TYPES[number];
export type AssetType = typeof ASSET_TYPES[number];
export type LiabilityType = typeof LIABILITY_TYPES[number];
export type WealthSourceType = typeof WEALTH_SOURCE_TYPES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type RiskTolerance = typeof RISK_TOLERANCE_LEVELS[number];

export const DEFAULT_ADDRESS = {
    country: '',
    city: '',
    street: '',
    state: '',
    stateCode: '',
    postalCode: '',
    type: 'Mailing' as AddressType
};

export const DEFAULT_EMAIL = {
    address: '',
    type: 'Personal' as ContactType,
    preferred: false
};

export const DEFAULT_PHONE = {
    number: '',
    type: 'Personal' as ContactType,
    preferred: false
};

export const DEFAULT_ID_DOC = {
    type: '',
    number: '',
    expiryDate: '',
    upload: ''
};

export const DEFAULT_OCCUPATION = {
    occupation: '',
    fromDate: '',
    toDate: ''
};

export const DEFAULT_INCOME = {
    type: 'Salary' as IncomeType,
    amount: ''
};

export const DEFAULT_ASSET = {
    type: 'Liquidity' as AssetType,
    amount: ''
};

export const DEFAULT_LIABILITY = {
    type: 'Personal Loan' as LiabilityType,
    amount: ''
};

export const DEFAULT_SOURCE = {
    type: 'Inheritance' as WealthSourceType,
    amount: ''
};

export const DEFAULT_INVESTMENT = {
    experience: '<5 years' as ExperienceLevel,
    riskTolerance: '10%' as RiskTolerance
};

export const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;