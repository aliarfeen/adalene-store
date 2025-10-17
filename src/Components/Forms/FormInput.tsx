import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  register,
  error,
  type = "text",
  placeholder = "",
}) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`mt-1 block w-full border p-3 rounded-lg text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormInput;
