//Third Party imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

//Local imports
import { authSliceActions } from "../store/authSlice";
import { userdataSliceActions } from "../store/userdataSlice";

const getUserId = (username, password, userdata) =>
  Object.keys(userdata).find(
    (id) =>
      userdata[id].username === username && userdata[id].password === password
  );

const LoginAuthentication = (props) => {
  const userdata = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const { username, password, setIncorrectCreds, endAuthenticationProcess } =
    props;
  const id = getUserId(username, password, userdata);

  useEffect(() => {
    if (!id) {
      console.log("creds wrong");
      setIncorrectCreds(true);
      endAuthenticationProcess();
    } else {
      console.log("creds correct");
      dispatch(authSliceActions.authenticateUser(id));
      dispatch(userdataSliceActions.setUserStatus({ id, status: "Active" }));
      setLoggedIn(true);
    }
  });

  return loggedIn ? <Navigate to="home/users" /> : null;
};

export default LoginAuthentication;
