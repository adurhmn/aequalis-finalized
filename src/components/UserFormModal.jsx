//Third Party imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState, useCallback } from "react";
import { Modal } from "@mui/material";

//Custom imports
import StyledButton from "./Button";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { userdataSliceActions } from "../store/userdataSlice";

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
  display: grid;
  grid-template-areas:
    "username username"
    "role status"
    "password confirmPassword"
    "data data"
    "btnBox btnBox";
  gap: 1.3rem;
  padding: 1.5rem;
`;

const ButtonBox = styled("div")`
  border-top: 1px solid lightgrey;
  padding: 1.5rem;
  text-align: right;
`;

const isJSON = (value) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const UserFormModal = (props) => {
  const usernameRef = useRef();
  const roleRef = useRef();
  const statusRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const dataRef = useRef();
  const [usernameFilled, setUsernameFilled] = useState();
  const [passwordFilled, setPasswordFilled] = useState();
  const [cpasswordFilled, setCpasswordFilled] = useState();
  const [dataFilled, setDataFilled] = useState();
  const [formValidatedOnce, setFormValidatedOnce] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [dataFormatMismatch, setDataFormatMismatch] = useState(false);
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const { isOpen, closeModal, editForm, id, keepMounted } = props;

  const saveHandler = useCallback(() => {
    const username = usernameRef.current.value;
    const role = roleRef.current.value;
    const status = statusRef.current.value;
    const password = passwordRef.current.value;
    const cpassword = cpasswordRef.current.value;
    const data = dataRef.current.value;
    let idCopy = id;
    setUsernameFilled(!!username);
    setPasswordFilled(!!password);
    setCpasswordFilled(!!cpassword);
    setDataFilled(!!data);
    !formValidatedOnce && setFormValidatedOnce(true);

    //generating unique userIds for new user
    if (!editForm) {
      const takenIds = Object.keys(userdata);
      while (true) {
        //ten thousand possible userIds
        idCopy = String(Math.ceil(Math.random() * 10000));
        if (!takenIds.includes(idCopy)) break;
      }
    }

    if (username !== "" && password !== "" && cpassword !== "" && data !== "") {
      let formValid = true;
      //check if passwords match
      if (password !== cpassword) {
        setPasswordMismatch(true);
        formValid = false;
      }

      //check if data is in JSON format
      if (!isJSON(data)) {
        setDataFormatMismatch(true);
        formValid = false;
      }

      //save data
      if (formValid) {
        dispatch(
          userdataSliceActions.addUser({
            id: idCopy,
            username,
            password,
            role,
            status,
            data,
          })
        );
        //clearing form
        //on edit mode form will be unmounted after closing modal, so data will be cleared by default
        //on create mode, form will not be unmounted after closing modal, so we have to clear data manually after save for better ux
        !editForm && (usernameRef.current.value = "");
        !editForm && (roleRef.current.value = "Admin");
        !editForm && (statusRef.current.value = "Logged out");
        !editForm && (passwordRef.current.value = "");
        !editForm && (cpasswordRef.current.value = "");
        !editForm && (dataRef.current.value = "");

        closeModal();
      }
    }
  }, [userdata]);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        closeModal();
        setFormValidatedOnce(false);
        setPasswordMismatch(false);
        setDataFormatMismatch(false);
      }}
      keepMounted={keepMounted}
    >
      <FormBox>
        <FormHeading direction="row" justifyContent="space-between">
          {editForm ? <p>Edit user</p> : <p>Create new user</p>}
          <CloseIcon onClick={closeModal} fontSize="large" />
        </FormHeading>
        <FormContent>
          <Box sx={{ gridArea: "username" }}>
            <InputField
              ref={usernameRef}
              label="Username"
              type="text"
              placeholder="Enter Username"
              required
              isFilled={
                usernameFilled ? true : formValidatedOnce ? false : true
              }
              setValidity={() => {
                setUsernameFilled(true);
              }}
              dynamicAttrs={
                editForm ? { defaultValue: userdata[id].username } : {}
              }
            />
          </Box>
          <Box sx={{ gridArea: "role" }}>
            <InputField
              ref={roleRef}
              label="Role"
              inputType="select"
              required
              selected="Admin"
              isFilled={true}
              setValidity={() => null}
              dynamicAttrs={editForm ? { defaultValue: userdata[id].role } : {}}
            >
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
            </InputField>
          </Box>
          <Box sx={{ gridArea: "status" }}>
            <InputField
              ref={statusRef}
              label="Status"
              inputType="select"
              required
              selected="Logged out"
              isFilled={true}
              setValidity={() => null}
              dynamicAttrs={
                editForm ? { defaultValue: userdata[id].status } : {}
              }
            >
              <option value="Logged out">Logged out</option>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </InputField>
          </Box>
          <Box sx={{ gridArea: "password" }}>
            <InputField
              ref={passwordRef}
              label="Password"
              type="password"
              placeholder="Enter Password"
              required
              isFilled={
                passwordFilled ? true : formValidatedOnce ? false : true
              }
              setValidity={() => {
                setPasswordFilled(true);
                setPasswordMismatch(false);
              }}
              dynamicAttrs={
                editForm ? { defaultValue: userdata[id].password } : {}
              }
            />
          </Box>
          <Box sx={{ gridArea: "confirmPassword" }}>
            <InputField
              ref={cpasswordRef}
              label="Confirm Password"
              type="password"
              placeholder="Enter Password"
              required
              isFilled={
                cpasswordFilled ? true : formValidatedOnce ? false : true
              }
              hasError={passwordMismatch}
              errMsg="Passwords doesn't match!"
              setValidity={() => {
                setCpasswordFilled(true);
                setPasswordMismatch(false);
              }}
              dynamicAttrs={
                editForm ? { defaultValue: userdata[id].password } : {}
              }
            />
          </Box>
          <Box sx={{ gridArea: "data" }}>
            <InputField
              ref={dataRef}
              label="Data (json)"
              inputType="textarea"
              placeholder="Enter Data (in json)"
              required
              height="10rem"
              isFilled={dataFilled ? true : formValidatedOnce ? false : true}
              hasError={dataFormatMismatch}
              errMsg="Data must strictly be in JSON format!"
              setValidity={() => {
                setDataFilled(true);
                setDataFormatMismatch(false);
              }}
              dynamicAttrs={
                editForm
                  ? { defaultValue: JSON.stringify(userdata[id].data) }
                  : {}
              }
            />
          </Box>
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

export default UserFormModal;
