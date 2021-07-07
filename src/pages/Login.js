import React from "react";
import styled from "styled-components";
import GoogleButton from "react-google-button";
import { auth, GoogleProvider } from "../firebase";

function Login() {
  return (
    <Container>
      <LoginContainer>
        <Title>Tasks Organizer</Title>
        <LoginButton onClick={SignIn} />
      </LoginContainer>
    </Container>
  );
}

export default Login;

function SignIn() {
  auth.signInWithPopup(GoogleProvider);
}

const Container = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 55px;
  margin-bottom: 80px;
`;

const LoginButton = styled(GoogleButton)`
  float: none;
  position: static;
  display: block;
  margin: auto;
  width: max-content;
`;
