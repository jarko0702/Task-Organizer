import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Project from "../components/Project";

function Tasks() {
  //   const [user] = useAuthState(auth);
  //   const [projects, setProjects] = useState();

  //   useEffect(() => {
  //     db.collection(user.uid)
  //       .doc("Data")
  //       .collection("Projects")
  //       .onSnapshot((snapshot) => {
  //         setProjects(
  //           snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
  //         );
  //         console.log(projects);
  //       });
  //   }, []);

  return (
    <Container>
      <Header />
      <TasksBody>
        <Sidebar>
          <SidebarTitle>Your Projects</SidebarTitle>
          <ProjectsList>
            <Project projectTitle="Test" />
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
