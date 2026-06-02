import React, { useState } from "react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(()=>setIsSubmitted(false),3000);

  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center items-center  dark:bg-gray-800 transition-colors duration-500">
      {/** main container card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 text-white p-10 md:w-[40%] flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-indigo-100 mb-8 leading-relaxed">
            Have a question about your expenses? Found a bug? Our support team
            is here to help you secure your financial future.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="material-icons-outlined bg-indigo-500 p-3 rounded-full">
                email
              </span>
              <p className="font-medium">support@expensemanager.com</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="material-icons-outlined bg-indigo-500 p-3 rounded-full">
                phone
              </span>
              <p className="font-medium">+91 (800) 123-4567</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="material-icons-outlined bg-indigo-500 p-3 rounded-full">
                location_on
              </span>
              <p className="font-medium">Hyderabad, Telangana, India</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Contact Form */}
        {/* Takes up the remaining 60% of the width on laptops */}

        <div className="p-10 md:w-[60%]">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Send us a message
          </h3>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl flex items-center gap-3 animate-fade-in-up">
              <span className="material-icons-outlined">check_circle</span>
              <p className="font-semibold">
                Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea rows="4" required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-colors resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md cursor-pointer">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
