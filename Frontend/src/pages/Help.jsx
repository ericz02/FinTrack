const Help = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Help</h1>
            <p className="mt-1 text-sm text-gray-500">Find answers to commonly asked questions.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">How do I add an expense?</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  To add an expense, navigate to the "Expenses" page and fill in the required details such as category, vendor, date, amount, and purpose of the expense. You can also upload a receipt if available.
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">How can I view my financial reports?</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  You can view your financial reports by clicking on the "Transactions" tab. From there, you can select the type of report you want to view, such as income statement, balance sheet, or cash flow statement.
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">What should I do if I encounter an issue?</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  If you encounter any issues or have any questions that are not addressed in this help section, please contact our support team for assistance. You can reach us via email or through our online chat support.
                </dd>
              </div>
              {/* Add more FAQs here */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
