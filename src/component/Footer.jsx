import React from 'react';

const Footer = () => {
  return (
    
    <footer className="bg-white border-t border-gray-100 py-8 dark:text-white dark:bg-gray-800 text-center mt-auto">
      <p className="text-gray-500 text-sm">
        {/* We use JavaScript to always get the current year! */}
        © {new Date().getFullYear()} Expense Manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;