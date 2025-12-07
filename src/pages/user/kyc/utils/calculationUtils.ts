export const calculateTotal = (items: { amount: string }[]): number => {
    return items?.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0) || 0;
};

export const calculateTotals = (incomes: { amount: string }[], liabilities: { amount: string }[], sources: { amount: string }[], assets: { amount: string }[]) => {
    const totalIncomes = calculateTotal(incomes);
    const totalLiabilities = calculateTotal(liabilities);
    const totalSources = calculateTotal(sources);
    const totalAssets = calculateTotal(assets);

    return {
        totalIncomes,
        totalLiabilities,
        totalSources,
        totalAssets
    };
};