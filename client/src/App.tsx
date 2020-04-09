import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  TextareaAutosize,
  Container,
  Tabs,
  Tab,
} from "@material-ui/core";

const EmptyErrorState = {
  url: "",
  selector: "",
}

function App() {
  const [url, setUrl] = useState("");
  const [selector, setSelector] = useState("");
  const [format, setFormat] = useState(0); // Text
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(EmptyErrorState);

  function textAreaFormat(resultsArray: String[]) {
    switch (format) {
      case 0: // Text
        return resultsArray.join("\n");
      case 1: // Array
        return `[${resultsArray.join(",\n")}]`;
      case 2: // Number
        return resultsArray.map((item, n) => `${n + 1}.\t${item}`).join("\n");
      default:
        return resultsArray.join("\n");
    }
  }

  function handleUrlInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.currentTarget.value);
    setError({...error, url: ""})
  }

  function handleSelectorInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelector(e.currentTarget.value);
    setError({...error, selector: ""})
  }

  function handleButtonClick() {
    let errorFlag: Boolean = false;
    let errorReturn = {
      url: "",
      selector: "",
    }

    if (selector.length === 0) {
      errorReturn.selector = "Please enter a valid CSS selector";
      errorFlag = true;
    }

    if (url.length === 0) {
      errorReturn.url = "Please enter a valid URL";
      errorFlag = true;
    }

    setError(errorReturn);

    if (errorFlag){
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

  function handleFormatSelectChange(event: any, newValue: number) {
    setFormat(newValue);
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" justify="center" alignItems="center">
        <h1 style={{margin: 0}}>Web Scraper</h1>
        <p style={{marginTop: "0.25rem"}}>by @omgitsfrancis</p>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <TextField
            variant="outlined"
            onChange={handleUrlInputChange}
            label="Target URL"
            placeholder=" Example: https://djmag.com/top100djs"
            size="small"
            error={error.url.length > 0}
            helperText={error.url.length > 0 ? error.url : " "}
            fullWidth
          />
          <TextField
            variant="outlined"
            onChange={handleSelectorInputChange}
            label="Selector"
            placeholder="Ex: .top100dj-name a"
            size="small"
            error={error.selector.length > 0}
            helperText={error.selector.length > 0 ? error.selector : " "}
            style={{ marginRight: "1rem" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
          >
            Scrape
          </Button>
        </Grid>
        <Tabs
          value={format}
          onChange={handleFormatSelectChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="text" />
          <Tab label="array" />
          <Tab label="num" />
        </Tabs>
        <TextareaAutosize
          placeholder={fetching ? "I am being fetched..." : "Results"}
          value={textAreaFormat(results)}
          rowsMin={10}
          readOnly
          style={{ width: "100%", resize: "none" }}
        />
      </Grid>
    </Container>
  );
}

export default App;
