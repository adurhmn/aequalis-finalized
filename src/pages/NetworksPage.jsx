//Third party imports
import { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//Custom imports
import PrimaryNavbar from "../components/PrimaryNavbar";
import { networkdataSliceActions } from "../store/networkdataSlice";
import NetworkFormModal from "../components/NetworkFormModal";
import StyledButton from "../components/Button";

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
  width: 23rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.4rem;
  overflow: auto;
`;

const Cell = styled("td")`
  display: inline-block;
  width: 23rem;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.4rem;
  overflow: auto;
`;

const NetworksData = (props) => {
  const data = useSelector((state) => state.networkdata);
  const dispatch = useDispatch();
  const networkIds = Object.keys(data);

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
              <HeadCell>Network</HeadCell>
              <HeadCell>Description</HeadCell>
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
            {networkIds.map((id) => (
              <Row key={id}>
                <Cell>{data[id].network}</Cell>
                <Cell>{data[id].description}</Cell>
                <Cell>
                  <StyledButton
                    btnTheme="purple"
                    sx={{
                      mr: ".8rem",
                    }}
                    children="Edit"
                    onClick={() => {
                      props.setNetworkToEdit(id);
                      props.openEditModal();
                    }}
                  />
                  <StyledButton
                    btnTheme="red"
                    onClick={() =>
                      dispatch(networkdataSliceActions.deleteNetwork(id))
                    }
                    children="Delete"
                  />
                </Cell>
              </Row>
            ))}
          </Box>
        </Box>
        <StyledButton
          btnTheme="green"
          onClick={props.openCreateModal}
          children="Add new network"
        />
      </Stack>
    </Stack>
  );
};

const NetworksPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.sessionExists);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [networkToEdit, setNetworkToEdit] = useState(null);

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <Fragment>
      <PrimaryNavbar />
      <NetworksData
        openCreateModal={() => setCreateModalIsOpen(true)}
        openEditModal={() => setEditModalIsOpen(true)}
        setNetworkToEdit={(id) => setNetworkToEdit(id)}
      />
      <NetworkFormModal
        isOpen={createModalIsOpen}
        closeModal={() => setCreateModalIsOpen(false)}
        keepMounted
      />
      <NetworkFormModal
        isOpen={editModalIsOpen}
        closeModal={() => setEditModalIsOpen(false)}
        editForm
        networkId={networkToEdit}
      />
    </Fragment>
  );
};

export default NetworksPage;
