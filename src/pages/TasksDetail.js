import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import TaskSidebar from "../components/TaskSidebar";
import { auth, db } from "../firebase";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import ViewTask from "../components/ViewTask";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Tasks() {
  const [user] = useAuthState(auth);
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState();

  const [addedTaskName, setAddedTaskName] = useState();
  const [addedTaskDescription, setAddedTaskDescription] = useState();

  useEffect(() => {
    if (projectId !== undefined && user !== null) {
      db.collection(user.uid)
        .doc("Data")
        .collection("Projects")
        .doc(projectId)
        .onSnapshot((snapshot) => {
          setProjectDetail(snapshot.data());
        });
    }
  }, [projectId, user]);

  function handleAddedTask(e) {
    e.preventDefault();

    db.collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .doc(projectId)
      .collection("Tasks")
      .add({ name: addedTaskName, description: addedTaskDescription });

    setAddedTaskName("");
    setAddedTaskDescription("");
  }

  if (projectDetail === undefined || null) {
    return (
      <Container>
        <Header />
        <Content>
          <TaskSidebar />
          <TasksBody>
            <TaskContent>
              <TaskHeader>
                <TaskTitle>Select a Project...</TaskTitle>
              </TaskHeader>
            </TaskContent>
          </TasksBody>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <TaskSidebar />
        <TasksBody>
          <TaskContent>
            <TaskHeader>
              <TaskTitle>{projectDetail.name}</TaskTitle>
              <Popup
                trigger={
                  <AddTask>
                    <IconButton>
                      <AddIcon fontSize="large" />
                    </IconButton>
                    <h3>Add Task</h3>
                  </AddTask>
                }
                position="bottom"
              >
                <form onSubmit={handleAddedTask}>
                  <input
                    id="name"
                    placeholder="Task name"
                    onChange={(e) => setAddedTaskName(e.target.value)}
                    value={addedTaskName}
                  ></input>
                  <input
                    id="description"
                    placeholder="Task descripton"
                    onChange={(e) => setAddedTaskDescription(e.target.value)}
                    value={addedTaskDescription}
                  ></input>
                  <button type="submit">Add Task</button>
                </form>
              </Popup>
            </TaskHeader>
            <ViewTask />
          </TaskContent>
        </TasksBody>
      </Content>
    </Container>
  );
}

export default Tasks;

const Container = styled.div``;

const TasksBody = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
`;

const TaskContent = styled.div`
  padding: 10px;
  width: 75%;
`;

const TaskHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75vw;
`;
const TaskTitle = styled.h1`
  margin-bottom: 5px;
`;

const AddTask = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 175px;

  :hover {
    cursor: pointer;
    background-color: #f5f5f5;
    border-radius: 15px;
  }
`;
