import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors";
import { AppBar, Link } from "@material-ui/core";

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
      <AppBar
        position="static"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <h2 style={{ margin: "0rem" }}>Web Scraper</h2>
        <span style={{ margin: "0.25rem" }}>
          by{" "}
          <Link href="http://www.google.com" style={{ color: "inherit" }}>
            @omgitsfrancis
          </Link>
        </span>
      </AppBar>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
