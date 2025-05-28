import React, { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6 border border-gray-200 rounded-lg">
      <div className="bg-gray-100 px-6 py-4 font-medium text-sm border-b border-gray-200">
        {title}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;