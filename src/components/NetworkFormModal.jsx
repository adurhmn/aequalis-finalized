import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState, useCallback } from "react";
import React from "react";
import { Modal } from "@mui/material";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "./Button";
import { networkdataSliceActions } from "../store/networkdataSlice";

CloseIcon = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);

  &:hover {
    color: grey;
  }
`;

const FormBox = styled(Box)`
  border-radius: 3px;
  background-color: white;
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;

  &:focus {
    outline: none;
  }
`;

const FormHeading = styled(Stack)`
  font-size: 2rem;
  padding: 2rem;
  border-bottom: 1px solid lightgrey;
  position: relative;
`;

const FormContent = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  padding: 1.5rem;
`;

const ButtonBox = styled("div")`
  border-top: 1px solid lightgrey;
  padding: 1.5rem;
  text-align: right;
`;

const NetworkFormModal = (props) => {
  const networkRef = useRef();
  const descriptionRef = useRef();
  const [networkFilled, setNetworkFilled] = useState(false);
  const [descriptionFilled, setDescriptionFilled] = useState(false);
  const [formValidatedOnce, setFormValidatedOnce] = useState(false);
  const networkdata = useSelector((state) => state.networkdata);
  const dispatch = useDispatch();
  const { isOpen, closeModal, editForm, networkId: id, keepMounted } = props;

  const saveHandler = useCallback(() => {
    const network = networkRef.current.value;
    const description = descriptionRef.current.value;
    setNetworkFilled(!!network);
    setDescriptionFilled(!!description);
    !formValidatedOnce && setFormValidatedOnce(true);
    let idCopy = id;

    //generating unique userIds for new user
    if (!editForm) {
      const takenIds = Object.keys(networkdata);
      while (true) {
        //ten thousand possible networkIds
        idCopy = String(Math.ceil(Math.random() * 10000));
        if (!takenIds.includes(idCopy)) break;
      }
    }

    if (network !== "" && description !== "") {
      dispatch(
        networkdataSliceActions.addNetwork({
          id: idCopy,
          network,
          description,
        })
      );
      //clearing form
      //on edit mode form will be unmounted after closing modal, so data will be cleared by default
      //on create mode, form will not be unmounted after closing modal, so we have to clear data manually after save for better ux
      !editForm && (networkRef.current.value = "");
      !editForm && (descriptionRef.current.value = "");

      closeModal();
    }
  }, [networkdata]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        closeModal();
        setFormValidatedOnce(false);
      }}
      keepMounted={keepMounted}
    >
      <FormBox>
        <FormHeading direction="row" justifyContent="space-between">
          {editForm ? <p>Edit network</p> : <p>Create new network</p>}
          <CloseIcon onClick={closeModal} fontSize="large" />
        </FormHeading>
        <FormContent>
          <InputField
            ref={networkRef}
            label="Name"
            fieldWidth="100%"
            type="text"
            placeholder="Network name"
            required
            isFilled={networkFilled ? true : formValidatedOnce ? false : true}
            setValidity={() => setNetworkFilled(true)}
            dynamicAttrs={
              editForm ? { defaultValue: networkdata[id]?.network } : {}
            }
          />
          <InputField
            ref={descriptionRef}
            label="Description"
            fieldWidth="100%"
            inputType="textarea"
            placeholder="Enter Description"
            required
            isFilled={
              descriptionFilled ? true : formValidatedOnce ? false : true
            }
            setValidity={() => {
              setDescriptionFilled(true);
            }}
            dynamicAttrs={
              editForm ? { defaultValue: networkdata[id]?.description } : {}
            }
          />
          <ButtonBox sx={{ gridArea: "btnBox" }}>
            <StyledButton
              btnTheme="white"
              onClick={closeModal}
              children="Cancel"
              sx={{ mr: ".8rem" }}
            />
            <StyledButton
              btnTheme="green"
              onClick={saveHandler}
              children="Save"
            />
          </ButtonBox>
        </FormContent>
      </FormBox>
    </Modal>
  );
};

export default NetworkFormModal;
