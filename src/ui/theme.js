//Third Party imports
import { createTheme } from "@mui/material";

const theme = createTheme({
  buttonColor: {
    red: {
      main: "#ff000d",
      focus: "#ff000d90",
      hover: "#d6000b",
      border: "#ff000d",
      text: "white",
    },
    green: {
      main: "#0fb100",
      focus: "#0fb10090",
      hover: "#0c9400",
      border: "#0fb100",
      text: "white",
    },
    purple: {
      main: "#8113ff",
      focus: "#8113ff90",
      hover: "#243ce6",
      border: "#8113ff",
      text: "white",
    },
    blue: {
      main: "#41a6e1",
      focus: "#41a6e190",
      hover: "#2797d8",
      border: "#41a6e1",
      text: "white",
    },
    white: {
      main: "white",
      focus: "#8f8f8f90",
      hover: "#e6e6e6",
      border: "#3b3b3b",
      text: "grey",
    },
  },
});
// console.log(theme);
export default theme;
