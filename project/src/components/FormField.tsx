import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  characterCount?: {
    current: number;
    max: number;
  };
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required = false, 
  children, 
  error,
  characterCount
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      <div className="flex justify-between mt-1 text-xs">
        {error && <span className="text-red-500">{error}</span>}
        {characterCount && (
          <span className="text-gray-500 ml-auto">
            {characterCount.current} / {characterCount.max}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormField;