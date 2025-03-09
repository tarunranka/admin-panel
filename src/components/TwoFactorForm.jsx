import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Loader2 } from "lucide-react"; // Import Loader Icon

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  text-align: center;
  letter-spacing: 3px;
  width: 100%;
  margin: 0 auto;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #667eea;
    outline: none;
    box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
  }
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#94a3b8" : "#007bff")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#94a3b8" : "#0056b3")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  text-align: center;
`;

const TwoFactorForm = ({ onVerify, loading, error }) => {
  const [code, setCode] = useState("");

  // Auto-focus on input field when component loads
  useEffect(() => {
    document.getElementById("2fa-input")?.focus();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 6) {
      setCode(value);
    }

    // Auto-submit when the user enters 6 digits
    if (value.length === 6) {
      onVerify(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        id="2fa-input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength="6"
        placeholder="(123456) Enter 6-digit code"
        value={code}
        onChange={handleChange}
        aria-label="Two-factor authentication code"
        disabled={loading}
      />
      <Button type="submit" disabled={loading || code.length !== 6}>
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Verifying...
          </>
        ) : (
          "Verify"
        )}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default TwoFactorForm;
