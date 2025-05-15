import React, { useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { date } from "yup";
import { input } from "framer-motion/client";

type IconInputProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  error?: string;
  touched?: boolean;
  fieldProps: any;
};

export default function IconInput({
  id,
  label,
  icon,
  type = "text",
  error,
  touched,
  fieldProps,
}: IconInputProps) {
  
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  // Valid if touched and no error
  const isValid = touched && !error;

  const inputRef = useRef<HTMLInputElement>(null)

  // Handle input focus and blur
  
  const handleFocus = () => setIsFocused(true);

  const handleClick=(e:React.MouseEvent)=>{
    if(type==="date"&& inputRef.current){
      e.preventDefault()
      inputRef.current.showPicker();
    }
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Check if the input has a value after blur
    setHasValue(e.target.value.length > 0);
    // Call the original onBlur if it exists in fieldProps
    if (fieldProps.onBlur) fieldProps.onBlur(e);
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if the input has a value
    setHasValue(e.target.value.length > 0);
    // Call the original onChange if it exists in fieldProps
    if (fieldProps.onChange) fieldProps.onChange(e);
  };

  // Determine if label should float (when focused or has value)
  const shouldFloat = isFocused || hasValue;

  return (
    <div className="relative w-full mb-4">
      {/* Input wrapper */}
      <div
        className={`flex items-center px-3 py-3 border rounded-md bg-white focus-within:ring-2 transition-all duration-300 group
          ${
            error
              ? "border-red-500 focus-within:ring-red-500"
              : isValid
              ? "border-green-500 focus-within:ring-green-500"
              : "border-yellow-400 focus-within:ring-yellow-400"
          }
        `}
      >
        {/* Left icon */}
        <span className="mr-2 text-yellow-600 transition-transform duration-200 group-focus-within:scale-110">
          {icon}
        </span>

        {/* Input with explicit focus/blur handlers */}
        <input
          id={id}
          type={type}
          {...fieldProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onClick={handleClick}
          ref={inputRef}
          className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
        />

        {/* Success check icon */}
        {isValid && (
          <CheckCircle
            className="w-5 h-5 text-green-500 ml-2 transition-opacity duration-300"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Floating Label with state-based positioning */}
      <label
        htmlFor={id}
        className={`absolute left-11 px-1 bg-white transition-all duration-200
          ${
            shouldFloat
              ? "-top-2 text-sm text-yellow-600"
              : "top-3 text-base text-gray-400"
          }
        `}
      >
        {label}
      </label>

      {/* Error */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}