import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import TwoFactorForm from "../components/TwoFactorForm";
import { verify2FA } from "../store/authSlice";
import { selectMemoizedAuth } from "../store/authSelectors";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.33);
  margin-top: -64px;
`;

const AuthCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #1a1a1a;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const TwoFactorAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user email and auth state from Redux
  const { email, loading, error, isAuthenticated } =
    useSelector(selectMemoizedAuth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleVerify2FA = (code) => {
    dispatch(verify2FA({ email, code }));
  };

  return (
    <Container>
      <AuthCard>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Two-Factor Authentication
        </h2>

        {!email ? (
          <>
            <ErrorMessage>
              Email is missing. Please{" "}
              <Link to="/login" className="text-blue-500 underline">
                log in
              </Link>
              .
            </ErrorMessage>
          </>
        ) : (
          <>
            <p className="text-gray-600 text-sm text-center mb-4">
              Enter the verification code sent to <strong>{email}</strong>.
            </p>
            <TwoFactorForm onVerify={handleVerify2FA} loading={loading} />
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </AuthCard>
    </Container>
  );
};

export default TwoFactorAuth;
