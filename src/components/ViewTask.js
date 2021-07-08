import { IconButton } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";

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

  if (tasks == undefined || null) {
    return <h1>Searching for tasks...</h1>;
  }
  return (
    <>
      {tasks.map((task) => (
        <>
          <h1>Name: {task.name}</h1>
          <p>Description: {task.description}</p>
          <IconButton onClick={() => handleDeleteTask(task.id)}>
            <Delete />
          </IconButton>
        </>
      ))}
    </>
  );
}

export default ViewTask;
