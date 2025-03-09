import React, { useState } from "react";

const TwoFactorForm = ({ onVerify }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() !== "") {
      onVerify(code);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Two-Factor Authentication
      </h2>
      <p className="text-gray-600 text-sm text-center mb-4">
        Please enter the 6-digit code sent to your email.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength="6"
          className="border p-3 rounded-md w-full text-center text-lg tracking-widest"
        />

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
          Verify Code
        </button>
      </form>
    </>
  );
};

export default TwoFactorForm;
