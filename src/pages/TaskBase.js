import React from "react";
import Header from "../components/Header";
import TaskSidebar from "../components/TaskSidebar";

function TaskBase() {
  return (
    <div>
      <Header />
      <TaskSidebar />
    </div>
  );
}

export default TaskBase;
