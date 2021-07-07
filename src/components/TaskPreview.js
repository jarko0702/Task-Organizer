import { Checkbox } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

function TaskPreview(props) {
  const { title, description } = props;

  return (
    <TaskContainer>
      <div>
        <TaskTitle>{title}</TaskTitle>
        <TaskDescription>{description}</TaskDescription>
      </div>
      <Checkbox color="primary" />
    </TaskContainer>
  );
}

export default TaskPreview;

const TaskContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const TaskTitle = styled.h4`
  margin: 2px;
`;
const TaskDescription = styled.p`
  margin: 2px;
`;
