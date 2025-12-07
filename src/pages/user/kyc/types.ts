// KYC Type definitions - importing types from constants
import { ContactType, AddressType, IncomeType, AssetType, LiabilityType, WealthSourceType, ExperienceLevel, RiskTolerance } from './constants';

// Re-export types for convenience
export type { ContactType, AddressType, IncomeType, AssetType, LiabilityType, WealthSourceType, ExperienceLevel, RiskTolerance };

export interface Address {
    country: string;
    city: string;
    street: string;
    state: string;
    stateCode: string;
    postalCode: string;
    type: AddressType;
}

export interface Email {
    address: string;
    type: ContactType;
    preferred: boolean;
}

export interface Phone {
    number: string;
    type: ContactType;
    preferred: boolean;
}

export interface IdDoc {
    type: string;
    number: string;
    expiryDate: string;
    upload: string;
}

export interface Occupation {
    occupation: string;
    fromDate: string;
    toDate: string;
}

export interface Income {
    type: IncomeType;
    amount: string;
}

export interface Asset {
    type: AssetType;
    amount: string;
}

export interface Liability {
    type: LiabilityType;
    amount: string;
}

export interface Source {
    type: WealthSourceType;
    amount: string;
}

export interface BasicInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    dob: string;
    age: string;
}

export interface Investment {
    experience: ExperienceLevel;
    riskTolerance: RiskTolerance;
}

export interface FormData {
    firstName: string;
    lastName: string;
    middleName: string;
    dob: string;
    age: string;
    addresses: Address[];
    emails: Email[];
    phones: Phone[];
    idDocs: IdDoc[];
    occupations: Occupation[];
    incomes: Income[];
    assets: Asset[];
    liabilities: Liability[];
    sources: Source[];
    experience: ExperienceLevel;
    riskTolerance: RiskTolerance;
}