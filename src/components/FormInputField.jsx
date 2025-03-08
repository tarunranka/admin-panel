import React from "react";

const FormInputField = ({ label, name, type, value, handleChange }) => {
  return (
    <>
      <label className="block mb-1 mt-3 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
        placeholder={label}
      />
    </>
  );
};

export default FormInputField;
