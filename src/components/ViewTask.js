import { IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import styled from "styled-components";

function ViewTask() {
  const { projectId } = useParams();
  const [user] = useAuthState(auth);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const TaskRef = db
      .collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .doc(projectId)
      .collection("Tasks");
    TaskRef.onSnapshot((snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [projectId, user]);

  function handleDeleteTask(taskId) {
    db.collection(user.uid)
      .doc("Data")
      .collection("Projects")
      .doc(projectId)
      .collection("Tasks")
      .doc(taskId)
      .delete();
  }

  if (tasks === undefined || null) {
    return <h1>Searching for tasks...</h1>;
  }
  return (
    <>
      {tasks.map((task) => (
        <Container>
          <TaskInfo>
            <TaskTitle>{task.name}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
          </TaskInfo>
          <IconButton onClick={() => handleDeleteTask(task.id)}>
            <Delete />
          </IconButton>
        </Container>
      ))}
    </>
  );
}

export default ViewTask;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 15px;
  padding: 15px;
  margin: 7px;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TaskTitle = styled.h2`
  margin: 0px;
`;

const TaskDescription = styled.p`
  margin-bottom: 2px;
`;
