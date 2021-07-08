import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import Project from "./Project";

function TaskSidebar() {
  const [user] = useAuthState(auth);
  const [projects, setProjects] = useState();

  useEffect(() => {
    if (user !== null || undefined) {
      db.collection(user.uid)
        .doc("Data")
        .collection("Projects")
        .onSnapshot((snapshot) => {
          setProjects(
            snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
          );
        });
    }
  }, [user]);

  function handleAddProject() {
    const projectName = prompt("Type a project name");
    db.collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .add({ name: projectName });
  }

  return (
    <Container>
      <SidebarHeader>
        <SidebarTitle>Your Projects</SidebarTitle>
        <AddProject onClick={handleAddProject}>Add a new project</AddProject>
      </SidebarHeader>
      <ProjectsList>
        {projects === undefined || null ? (
          <p>no projects</p>
        ) : (
          projects.map((project) => (
            <Project
              key={project.id}
              projectId={project.id}
              projectTitle={project.name}
            />
          ))
        )}
      </ProjectsList>
    </Container>
  );
}

export default TaskSidebar;

const Container = styled.div`
  border-right: 1px solid lightgray;
  width: 25%;
  max-width: 400px;
  padding: 10px;
  overflow: auto;
  margin-right: 20px;
`;

const SidebarTitle = styled.h1``;

const ProjectsList = styled.div``;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const AddProject = styled.button`
  background: none;
  border: none;
  padding: 10px;

  :hover {
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 15px;
  }
`;
