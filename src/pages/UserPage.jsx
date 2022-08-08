//Third party imports
import { Fragment, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

//Custom imports
import { Box, styled } from "@mui/system";
import PrimaryNavbar from "../components/PrimaryNavbar";
import UserFormModal from "../components/UserFormModal";

const Header = styled("header")`
  padding: 1.7rem;
  background-color: lightgrey;
  color: #333940;
  margin-top: -4rem;
  margin-bottom: 4rem;
`;

const StyledLink = styled(Link)`
  color: royalblue;
  font-size: 1.4rem;

  &:hover {
    color: #3452ac;
  }
`;

const DataBox = styled(Box)`
  border: 1px solid #9b9b9b;
  border-radius: 3px;
  width: 100rem;
  margin: 0 auto;
`;

const Title = styled("p")`
  padding: 1.5rem;
  font-weight: lighter;
  border-bottom: 1px solid #9b9b9b;
  background-color: #dbdbdb21;
`;

const Data = styled("div")`
  padding: 2rem;
  display: grid;
  grid-template-areas:
    "username ."
    "role status"
    "data btn";
  gap: 3rem;
`;

const StyledButton = styled("button")`
  background-color: #8113ff;
  border-radius: 3px;
  border: none;
  padding: 1rem;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1.4rem;

  &:focus {
    outline: 3px solid #aab2f1;
  }

  &:hover {
    background-color: #243ce6;
  }
`;

const UserPage = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.userdata);
  const sessionExists = useSelector((state) => state.auth.sessionExists);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!sessionExists) return <Navigate to="/" />;

  if (data[id] === undefined) return <Navigate to="/home/users" />;

  return (
    <Fragment>
      <PrimaryNavbar />
      <Header>
        <StyledLink to="/home/users">Users</StyledLink>
        &nbsp;/&nbsp;{id}
      </Header>
      <DataBox>
        <Title>User</Title>
        <Data>
          <Box sx={{ gridArea: "username" }}>
            <p>Username: {data[id].username}</p>
          </Box>
          <Box sx={{ gridArea: "role" }}>
            <p>Role: {data[id].role}</p>
          </Box>
          <Box sx={{ gridArea: "status" }}>
            <p>Status: {data[id].status}</p>
          </Box>
          <Box sx={{ gridArea: "data" }}>
            <p>Data:</p> <br />
            <p>{JSON.stringify(data[id].data)}</p>
          </Box>
          <Box sx={{ gridArea: "btn", justifySelf: "end", alignSelf: "end" }}>
            <StyledButton onClick={() => setModalIsOpen(true)}>
              Edit
            </StyledButton>
          </Box>
        </Data>
      </DataBox>
      <UserFormModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        editForm
        id={id}
      />
    </Fragment>
  );
};

export default UserPage;
