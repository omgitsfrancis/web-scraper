import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, pink } from '@material-ui/core/colors';
 
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
