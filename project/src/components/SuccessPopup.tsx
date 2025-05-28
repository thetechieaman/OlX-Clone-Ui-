import React from 'react';

const SuccessPopup: React.FC = () => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fade-in-out">
      Your ad has been posted successfully!
    </div>
  );
};

export default SuccessPopup;