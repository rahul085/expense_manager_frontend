import React from "react";

const Services = () => {
  const servicesList = [
    {
      title: "Expense Tracking",
      description:
        "Log your daily expenses instantly and categorize them to see exactly where your money goes.",
      icon: "account_balance_wallet",
    },
    {
      title: "Secure Cloud Sync",
      description:
        "Your financial data is securely synced to your account, accessible from any device, anytime.",
      icon: "cloud_sync",
    },
    {
      title: "Smart Analytics",
      description:
        "Visualize your spending habits with intuitive charts and calculate your total balances automatically.",
      icon: "insights",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6  dark:bg-gray-800 transition-colors duration-500 ">
      {/** Responsive header */}
      <div className="max-w-4xl mx-auto text-center mb-16 ">
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900  mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-white ">
          Everything you need to take absolute control of your personal
          finances.
        </p>
      </div>
      {/** Responsive grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid:cols-3 gap-8 ">
        {servicesList.map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
              <span className="material-icons-outlined text-3xl">
                {service.icon}
              </span>
            </div>
            <h3 className="text-xl font-bold  text-gray-900 mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed ">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
