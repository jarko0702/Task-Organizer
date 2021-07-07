import React from "react";
import styled from "styled-components";

function Loading() {
  return (
    <Container>
      <Text>Loading...</Text>
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 75vh;
`;

const Text = styled.h1``;
