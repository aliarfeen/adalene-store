import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
}

// ✅ نستخدم forwardRef علشان يقبل ref من react-hook-form
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type, name, placeholder, value, onChange, icon, required }, ref) => {
    return (
      <>
      <div className="flex flex-col mb-4">
        <label htmlFor={name} className="text-l font-medium mb-1 text-gray-700">
          {label}
        </label>
        <div className="flex items-center">
          {icon && <span className="text-gray-400 mr-2">{icon}</span>}
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            ref={ref} // ✅ هنا بنمرر الـ ref
            className={`
              w-full 
              bg-transparent 
              text-l 
              text-gray-900 
              border-t-0 
              border-x-0 
              border-b 
              border-b-gray-400 
              py-1 
              focus:outline-none 
              focus:border-b-[2px] 
              focus:border-b-[#a25a2a] 
              transition-colors 
              duration-300
            `}
          />
        </div>
      </div>
      </>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
