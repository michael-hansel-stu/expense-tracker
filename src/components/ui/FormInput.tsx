"use client";
import React from "react";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  required?: boolean;
  options?: { label: string; value: string }[];
  step?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  options = [],
  step,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm text-gray-700 font-medium mb-2"
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          step={step}
          className="block w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      )}
    </div>
  );
};

export default FormInput;
