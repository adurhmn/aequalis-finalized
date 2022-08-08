//Third Party Imports
import { Fragment, useCallback, useRef, useState } from "react";
import Stack from "@mui/material/Stack";

//Local Imports
import PrimaryNavbar from "../components/PrimaryNavbar";
import InputField from "../components/InputField";
import LoginAuthentication from "../components/LoginAuthentication";
import ToolTip from "../components/ToolTip";
import Button from "../components/Button";

const LoginPage = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [usernameFilled, setUsernameFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [formValidatedOnce, setFormValidatedOnce] = useState(false);
  const [incorrectCreds, setIncorrectCreds] = useState(false);
  const [loginAuthenticationProcessing, setLoginAuthenticationProcessing] =
    useState(false);

  const loginHandler = useCallback(() => {
    setUsernameFilled(!!usernameRef.current.value);
    setPasswordFilled(!!passwordRef.current.value);
    !formValidatedOnce && setFormValidatedOnce(true);

    if (usernameRef.current.value !== "" && passwordRef.current.value !== "")
      setLoginAuthenticationProcessing(true);
  }, []);

  return (
    <Fragment>
      <PrimaryNavbar />
      <Stack alignItems="center">
        <Stack alignItems="start" justifyContent="start">
          {incorrectCreds ? (
            <ToolTip
              tip="Username or Password incorrect"
              closeToolTip={() => setIncorrectCreds(false)}
            />
          ) : null}
          <InputField
            ref={usernameRef}
            label="Username"
            fieldWidth="70rem"
            type="text"
            placeholder="Enter Username"
            required
            isFilled={usernameFilled ? true : formValidatedOnce ? false : true}
            setValidity={() => setUsernameFilled(true)}
          />

          <InputField
            ref={passwordRef}
            label="Password"
            fieldWidth="70rem"
            type="password"
            placeholder="Enter Password"
            required
            isFilled={passwordFilled ? true : formValidatedOnce ? false : true}
            setValidity={() => setPasswordFilled(true)}
          />
          <Button onClick={loginHandler} btnTheme="purple" children="Log in" />
        </Stack>
      </Stack>
      {loginAuthenticationProcessing ? (
        <LoginAuthentication
          username={usernameRef.current.value}
          password={passwordRef.current.value}
          setIncorrectCreds={setIncorrectCreds}
          endAuthenticationProcess={() =>
            setLoginAuthenticationProcessing(false)
          }
        />
      ) : null}
    </Fragment>
  );
};

export default LoginPage;
