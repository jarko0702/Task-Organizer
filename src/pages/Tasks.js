import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Project from "../components/Project";
import { auth, db } from "../firebase";

function Tasks() {
  const user = auth.currentUser;
  const [projects, setProjects] = useState();

  useEffect(() => {
    db.collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .onSnapshot((snapshot) => {
        setProjects(
          snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
        );
      });
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
      <Header />
      <TasksBody>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>Your Projects</SidebarTitle>
            <AddProject onClick={handleAddProject}>
              Add a new project
            </AddProject>
          </SidebarHeader>
          <ProjectsList>
            {projects === undefined ? (
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
        </Sidebar>
      </TasksBody>
    </Container>
  );
}

export default Tasks;

const Container = styled.div``;

const TasksBody = styled.div``;

const Sidebar = styled.div`
  border-right: 1px solid lightgray;
  width: 25%;
  max-width: 400px;
  padding: 10px;
`;

const SidebarTitle = styled.h1``;

const ProjectsList = styled.div`
  overflow: auto;
`;

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
