// components/TwoFactorForm.js
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  text-align: center;
  letter-spacing: 3px;
  width: 100%;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const TwoFactorForm = ({ onVerify, loading, error }) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().length === 6) {
      onVerify(code);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength="6"
        placeholder="Enter 6-digit code (123456)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        aria-label="Two-factor authentication code"
        disabled={loading}
      />
      <Button type="submit" disabled={loading || code.length !== 6}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Form>
  );
};

export default TwoFactorForm;
