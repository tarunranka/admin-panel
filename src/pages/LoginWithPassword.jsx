import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { login } from "../store/authSlice";

// used styled components

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

const Title = styled.h1`
  color: #1a1a1a;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #000;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 67%;
  transform: translateY(-50%);
  color: #718096;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a67d8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if ("credentials" in navigator) {
      navigator.credentials.get({ password: true }).then((cred) => {
        if (cred && !isAuthenticated) {
          setEmail(cred.id);
          setPassword(cred.password);
          dispatch(login({ email: cred.id, password: cred.password }));
        }
      });
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <LoginCard>
        <Title>Hala! Let's get started</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email Address</Label>
            <IconWrapper aria-hidden="true">
              <Mail size={20} />
            </IconWrapper>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              aria-required="true"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <IconWrapper aria-hidden="true">
              <Lock size={20} />
            </IconWrapper>
            <Input
              id="password"
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-required="true"
            />
          </InputGroup>
          <Button type="submit">Sign In</Button>
          {error && <ErrorMessage aria-live="assertive">{error}</ErrorMessage>}
        </form>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
