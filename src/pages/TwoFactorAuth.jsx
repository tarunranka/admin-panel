// pages/VerifyPage.js
import React from "react";
import styled from "styled-components";
import TwoFactorForm from "../components/TwoFactorForm";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.33);
`;

const LoginCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
`;

const VerifyPage = () => {
  const handleVerify2FA = (code) => {
    console.log(code);
  };

  return (
    <Container>
      <LoginCard>
        <TwoFactorForm onVerify={handleVerify2FA} />
      </LoginCard>
    </Container>
  );
};

export default VerifyPage;
