import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, name, value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <div 
          key={option.value}
          className={`
            px-4 py-2 border cursor-pointer transition-colors
            ${value === option.value 
              ? 'border-blue-500 bg-blue-50 text-blue-700' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          onClick={() => onChange(option.value)}
        >
          <label 
            htmlFor={`${name}-${option.value}`} 
            className="text-sm cursor-pointer flex items-center whitespace-nowrap"
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;