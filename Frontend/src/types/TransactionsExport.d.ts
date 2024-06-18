declare module '../exports/TransactionsExport' {
  const exportTransactions: (userId: string) => Promise<void>;
  export default exportTransactions;
}
