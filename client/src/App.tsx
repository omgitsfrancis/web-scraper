import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Grid, Container } from "@material-ui/core";
import Results from "./components/Results";

const EmptyErrorState = {
  url: "",
  selector: "",
};

function App() {
  const [url, setUrl] = useState("");
  const [selector, setSelector] = useState("");
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(EmptyErrorState);

  function handleUrlInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.currentTarget.value);
    setError({ ...error, url: "" });
  }

  function handleSelectorInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelector(e.currentTarget.value);
    setError({ ...error, selector: "" });
  }

  function handleScrapeClick() {
    let errorFlag: Boolean = false;
    let errorReturn = {
      url: "",
      selector: "",
    };

    if (selector.length === 0) {
      errorReturn.selector = "Please enter a valid CSS selector";
      errorFlag = true;
    }

    if (url.length === 0) {
      errorReturn.url = "Please enter a valid URL";
      errorFlag = true;
    }

    setError(errorReturn);

    if (errorFlag) {
      return;
    }

    setFetching(true);
    setResults([]);
    axios
      .post(`${process.env.REACT_APP_API}/scrape`, {
        target: url,
        selector: selector,
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  function handleClearClick() {
    setUrl("");
    setSelector("");
    setResults([]);
    setError(EmptyErrorState);
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <TextField
            variant="outlined"
            onChange={handleUrlInputChange}
            value={url}
            label="Target URL"
            placeholder=" Example: https://djmag.com/top100djs"
            size="small"
            disabled={fetching}
            error={error.url.length > 0}
            helperText={error.url.length > 0 ? error.url : " "}
            fullWidth
          />
          <TextField
            variant="outlined"
            onChange={handleSelectorInputChange}
            value={selector}
            label="Selector"
            placeholder="Ex: .top100dj-name a"
            size="small"
            disabled={fetching}
            error={error.selector.length > 0}
            helperText={error.selector.length > 0 ? error.selector : " "}
            style={{ marginRight: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={fetching}
            onClick={handleScrapeClick}
            style={{ marginRight: "1rem" }}
          >
            Scrape
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={fetching}
            onClick={handleClearClick}
          >
            Clear
          </Button>
        </Grid>
        <Results results={results} fetching={fetching} />
      </Grid>
    </Container>
  );
}

export default App;
