//Third Party imports
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//Custom imports
import PrimaryNavbar from "../components/PrimaryNavbar";
import { userdataSliceActions } from "../store/userdataSlice";
import UserFormModal from "../components/UserFormModal";
import StyledButton, { StyledLink } from "../components/Button";

const Row = styled("tr")`
  background-color: ${(props) => {
    return props.header === "true" ? "#d3d3d3c0" : "white";
  }};
  border-top: ${(props) => {
    return props.header === "true" ? "none" : "2px solid #d3d3d350";
  }};
  color: #181818;
  white-space: nowrap;
`;

const HeadCell = styled("th")`
  display: inline-block;
  width: 20rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.4rem;
  overflow: auto;
`;

const Cell = styled("td")`
  display: inline-block;
  width: 20rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.4rem;
  overflow: auto;
`;

const UsersData = (props) => {
  const data = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const userIds = Object.keys(data);

  return (
    <Stack alignItems="center">
      <Stack alignItems="end">
        <Box
          component="table"
          sx={{
            marginBottom: "2rem",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <Row header="true">
              <HeadCell>Login</HeadCell>
              <HeadCell>Role</HeadCell>
              <HeadCell>Status</HeadCell>
              <HeadCell>Data</HeadCell>
              <HeadCell>Actions</HeadCell>
            </Row>
          </thead>
          <Box
            component="tbody"
            sx={{
              maxHeight: "50vh",
              display: "block",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {userIds.map((id) => (
              <Row key={id}>
                <Cell>{data[id].username}</Cell>
                <Cell>{data[id].role}</Cell>
                <Cell>{data[id].status}</Cell>
                <Cell>{JSON.stringify(data[id].data)}</Cell>
                <Cell>
                  <StyledLink
                    btnTheme="blue"
                    to={`/home/user/${id}`}
                    sx={{
                      mr: ".8rem",
                    }}
                    children="Details"
                  />
                  <StyledButton
                    btnTheme="red"
                    onClick={() => {
                      dispatch(userdataSliceActions.deleteUser(id));
                    }}
                    children="Delete"
                  />
                </Cell>
              </Row>
            ))}
          </Box>
        </Box>
        <StyledButton
          btnTheme="green"
          onClick={props.openModal}
          children="Add new user"
        />
      </Stack>
    </Stack>
  );
};

const UsersPage = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.sessionExists);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <Fragment>
      <PrimaryNavbar />
      <UsersData openModal={() => setModalIsOpen(true)} />
      <UserFormModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        keepMounted
      />
    </Fragment>
  );
};

export default UsersPage;
