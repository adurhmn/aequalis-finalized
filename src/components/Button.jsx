import { styled } from "@mui/system";
import { Link } from "react-router-dom";

//Button
export default styled("button", {
  shouldForwardProp: (prop) => prop !== "btnTheme" && prop !== "sx",
})`
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.buttonColor[props.btnTheme].border};
  padding: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.buttonColor[props.btnTheme].text};
  background-color: ${(props) => props.theme.buttonColor[props.btnTheme].main};
  transition: background-color 0.3s, transform 0.2s;

  &:focus {
    outline: 3px solid
      ${(props) => props.theme.buttonColor[props.btnTheme].focus};
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.buttonColor[props.btnTheme].hover};
  }

  &:active {
    transform: scale(0.92);
  }
`;

//StyledLink
export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "btnTheme" && prop !== "sx",
})`
  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.buttonColor[props.btnTheme].border};
  padding: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.buttonColor[props.btnTheme].text};
  background-color: ${(props) => props.theme.buttonColor[props.btnTheme].main};
  transition: background-color 0.3s, transform 0.2s;

  &:focus {
    outline: 3px solid
      ${(props) => props.theme.buttonColor[props.btnTheme].focus};
  }

  &:hover {
    background-color: ${(props) =>
      props.theme.buttonColor[props.btnTheme].hover};
  }

  &:active {
    transform: scale(0.92);
  }
`;
