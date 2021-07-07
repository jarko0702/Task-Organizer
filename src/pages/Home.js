import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import TaskPreview from "../components/TaskPreview";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));
  const classes = useStyles();
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Header />

      <ContentContainer>
        <ProfilePicture src={user.photoURL} className={classes.large} />
        <Username>Welcome {user.displayName}</Username>
        <CardList>
          <Card>
            <CardTitle onClick={() => history.push("/tasks")}>
              Upcomming tasks
            </CardTitle>
            <TaskPreview title="Test" description="description" />
          </Card>
          <Card>
            <CardTitle>Files</CardTitle>
            <p>Work in Progress</p>
          </Card>
          <Card>
            <CardTitle>Messages</CardTitle>
            <p>Work in Progress</p>
          </Card>
        </CardList>
      </ContentContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10vh;
`;

const Username = styled.h1`
  text-align: center;
  font-size: 40px;
`;

const CardList = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin: 50px;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const Card = styled.div`
  width: 24vw;
  border: 1px solid lightgray;
  padding: 15px;
  margin: 20px;
  margin-bottom: 15px;
  min-width: 150px;
  max-width: 350px;
  height: 30vh;
  min-height: 200px;
`;

const CardTitle = styled.h3`
  :hover {
    cursor: pointer;
  }
`;

const ProfilePicture = styled(Avatar)`
  align-self: center;
  width: 200px;
  height: 200px;
`;
