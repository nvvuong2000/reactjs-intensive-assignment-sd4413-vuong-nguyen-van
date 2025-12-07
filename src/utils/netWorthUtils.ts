export const calculateNetWorth = (
    totalIncomes: number,
    totalAssets: number,
    totalLiabilities: number,
    totalSources: number
): number => {
    const sectionsWithItems = [
        totalIncomes,
        totalAssets,
        totalLiabilities,
        totalSources
    ].filter(amount => amount > 0);

    return sectionsWithItems.reduce((sum, amount) => sum + amount, 0);
};