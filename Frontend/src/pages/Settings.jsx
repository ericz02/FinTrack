const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Settings</h1>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Currency</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">USD</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">GMT+0</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Language</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">English</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Notifications</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                      Enable email notifications
                    </label>
                  </div>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Theme</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">Light</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Automatic Backup</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">Enabled</dd>
              </div>
              {/* Add more settings options here */}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
