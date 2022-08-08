import { forwardRef } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";

const InputContainer = styled("div")`
  margin-bottom: 2rem;
`;

const StyledLabel = styled("label")`
  display: block;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
`;

const StyledInput = styled(Box, {
  shouldForwardProp: (props) =>
    props !== "fieldWidth" &&
    props !== "sx" &&
    props !== "borderColor" &&
    props !== "height",
})`
  display: block;
  max-width: none;
  margin-bottom: 0.8rem;
  padding: 0.7rem;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 3px;
  background-color: rgba(124, 187, 230, 0.2);
  min-width: ${(props) => (props.fieldWidth ? props.fieldWidth : "100%")};
  height: ${(props) => (props.height ? props.height : "auto")};

  //textarea styles
  resize: vertical;
  max-height: 15rem;
  overflow-y: auto;

  &:placeholder-shown {
    background-color: initial;
  }

  &:focus {
    outline: 3px solid rgba(83, 163, 255, 0.5);
  }
`;

const ErrorMsg = styled("p")`
  color: red;
  font-size: 1.4rem;
`;

const InputField = forwardRef((props, ref) => {
  const {
    label,
    isFilled,
    fieldWidth,
    setValidity,
    children,
    hasError,
    errMsg,
    dynamicAttrs,
    ...standardAttrs
  } = props;

  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        fieldWidth={fieldWidth}
        borderColor={!hasError && isFilled ? "#5e85b1" : "red"}
        onChange={setValidity}
        ref={ref}
        component={props.inputType === undefined ? "input" : props.inputType}
        children={children}
        {...standardAttrs}
        {...dynamicAttrs}
      />
      {isFilled ? null : <ErrorMsg>{label} Required!</ErrorMsg>}
      {hasError ? <ErrorMsg>{errMsg}</ErrorMsg> : null}
    </InputContainer>
  );
});

export default InputField;
