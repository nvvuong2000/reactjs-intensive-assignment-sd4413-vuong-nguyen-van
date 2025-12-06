import { createContext, ReactNode, useState } from "react";

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    dateOfBirth: string;
}

export interface KYCInfo {
    idType: string;
    idNumber: string;
    issuedDate: string;
    expiryDate: string;
    documentUrl: string;
    verificationStatus: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: string;
    reviewNotes?: string;
}

export interface UserData {
    userId: number;
    personalInfo: PersonalInfo | null;
    kycInfo: KYCInfo | null;
}

interface UserDataContextType {
    userData: UserData;
    updatePersonalInfo: (info: PersonalInfo) => void;
    updateKYCInfo: (info: KYCInfo) => void;
    setUserId: (userId: number) => void;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<UserData>({
        userId: 0,
        personalInfo: null,
        kycInfo: null
    });

    const updatePersonalInfo = (info: PersonalInfo) => {
        setUserData(prev => ({
            ...prev,
            personalInfo: info
        }));
    };

    const updateKYCInfo = (info: KYCInfo) => {
        setUserData(prev => ({
            ...prev,
            kycInfo: info
        }));
    };

    const setUserId = (userId: number) => {
        setUserData(prev => ({
            ...prev,
            userId
        }));
    };

    return (
        <UserDataContext.Provider value={{ userData, updatePersonalInfo, updateKYCInfo, setUserId }}>
            {children}
        </UserDataContext.Provider>
    );
};
