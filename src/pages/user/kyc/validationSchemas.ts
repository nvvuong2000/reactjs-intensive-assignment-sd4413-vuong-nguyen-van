import * as yup from 'yup';
import { DATE_REGEX } from './constants';

export const basicInfoSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    middleName: yup.string().required('Middle name is required'),
    dob: yup.string().required('Date of birth is required').matches(DATE_REGEX, 'Date must be in DD/MM/YYYY format'),
    age: yup.string().required('Age is required'),
});

export const addressSchema = yup.object().shape({
    country: yup.string().required('Country is required'),
    city: yup.string().required('City is required'),
    street: yup.string().required('Street is required'),
    state: yup.string().required('State is required'),
    stateCode: yup.string().required('State code is required'),
    postalCode: yup.string().required('Postal code is required'),
    type: yup.string().required('Address type is required'),
});

export const emailSchema = yup.object().shape({
    address: yup.string().email('Invalid email format').required('Email address is required'),
    type: yup.string().required('Email type is required'),
    preferred: yup.boolean().required('Preferred is required'),
});

export const phoneSchema = yup.object().shape({
    number: yup.string().required('Phone number is required'),
    type: yup.string().required('Phone type is required'),
    preferred: yup.boolean().required('Preferred is required'),
});

export const idDocSchema = yup.object().shape({
    type: yup.string().required('Document type is required'),
    number: yup.string().required('Document number is required'),
    expiryDate: yup.string().required('Expiry date is required').matches(DATE_REGEX, 'Date must be in DD/MM/YYYY format'),
    upload: yup.string(),
});

export const occupationSchema = yup.object().shape({
    occupation: yup.string().required('Occupation is required'),
    fromDate: yup.string().required('From date is required').matches(DATE_REGEX, 'Date must be in DD/MM/YYYY format'),
    toDate: yup.string().required('To date is required').matches(DATE_REGEX, 'Date must be in DD/MM/YYYY format'),
});

export const incomeSchema = yup.object().shape({
    type: yup.string().required('Income type is required'),
    amount: yup.string().required('Amount is required'),
});

export const assetSchema = yup.object().shape({
    type: yup.string().required('Asset type is required'),
    amount: yup.string().required('Amount is required'),
});

export const liabilitySchema = yup.object().shape({
    type: yup.string().required('Liability type is required'),
    amount: yup.string().required('Amount is required'),
});

export const sourceSchema = yup.object().shape({
    type: yup.string().required('Source type is required'),
    amount: yup.string().required('Amount is required'),
});

export const investmentSchema = yup.object().shape({
    experience: yup.string().required('Experience is required'),
    riskTolerance: yup.string().required('Risk tolerance is required'),
});