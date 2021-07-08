import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

function Project({ projectTitle, projectId }) {
  const history = useHistory();

  function handleDeleteProject() {
    const user = auth.currentUser;
    db.collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .doc(projectId)
      .delete();
  }

  function openProject() {
    history.push(`/tasks/${projectId}`);
  }

  return (
    <ProjectContainer onClick={openProject}>
      <ProjectTitle>{projectTitle}</ProjectTitle>
      <IconButton onClick={handleDeleteProject}>
        <DeleteIcon />
      </IconButton>
    </ProjectContainer>
  );
}

export default Project;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px;
  border-radius: 15px;
  :hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
`;

const ProjectTitle = styled.h2``;
