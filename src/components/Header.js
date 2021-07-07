import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

function Header() {
  const history = useHistory();
  function handleSignOut() {
    auth.signOut().then(() => {
      history.push("/");
    });
  }
  return (
    <Container>
      <Title onClick={() => history.push("/")}>Task Organizer</Title>
      <LogOut onClick={handleSignOut}>Sign Out</LogOut>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100vw;
  background-color: #3ac13f;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 15px;
  color: white;

  :hover {
    cursor: pointer;
  }
`;

const LogOut = styled.button`
  margin: 15px;
  padding: 10px;
  background: none;
  border: none;
  border-radius: 30px;
  color: white;

  :hover {
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;
  }
`;
