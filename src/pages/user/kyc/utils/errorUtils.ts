export const scrollToFirstError = (
    errors: any,
    basicInfoRef: React.RefObject<HTMLDivElement>,
    addressesRef: React.RefObject<HTMLDivElement>,
    emailsRef: React.RefObject<HTMLDivElement>,
    phonesRef: React.RefObject<HTMLDivElement>,
    idDocsRef: React.RefObject<HTMLDivElement>,
    occupationsRef: React.RefObject<HTMLDivElement>,
    incomesRef: React.RefObject<HTMLDivElement>,
    assetsRef: React.RefObject<HTMLDivElement>,
    liabilitiesRef: React.RefObject<HTMLDivElement>,
    sourcesRef: React.RefObject<HTMLDivElement>,
    investmentRef: React.RefObject<HTMLDivElement>
) => {
    const sectionRefs = [
        { ref: basicInfoRef, errors: errors, isArray: false },
        { ref: addressesRef, errors: errors.addresses, isArray: true },
        { ref: emailsRef, errors: errors.emails, isArray: true },
        { ref: phonesRef, errors: errors.phones, isArray: true },
        { ref: idDocsRef, errors: errors.idDocs, isArray: true },
        { ref: occupationsRef, errors: errors.occupations, isArray: true },
        { ref: incomesRef, errors: errors.incomes, isArray: true },
        { ref: assetsRef, errors: errors.assets, isArray: true },
        { ref: liabilitiesRef, errors: errors.liabilities, isArray: true },
        { ref: sourcesRef, errors: errors.sources, isArray: true },
        { ref: investmentRef, errors: errors, isArray: false }
    ];

    for (const section of sectionRefs) {
        if (section.isArray) {
            if (section.errors && Array.isArray(section.errors) && section.errors.some((itemErrors: any) => itemErrors && Object.keys(itemErrors).length > 0)) {
                if (section.ref.current) {
                    section.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }
        } else {
            if (section.errors && typeof section.errors === 'object' && Object.values(section.errors).some((error: any) => error && typeof error === 'string' && error.trim() !== '')) {
                if (section.ref.current) {
                    section.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }
        }
    }
};