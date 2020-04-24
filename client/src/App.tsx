import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Container,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Results from "./components/Results";

const EmptyErrorState = {
  url: "",
  selector: "",
  attribute: "",
};

function App() {
  const [url, setUrl] = useState("");
  const [selector, setSelector] = useState("");
  const [dataType, setDataType] = useState("text");
  const [attribute, setAttribute] = useState("");
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

  function handleAttributeInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAttribute(e.currentTarget.value);
    setError({ ...error, attribute: "" });
  }

  function handleDataTypeChange(e: any) {
    setDataType(e.target.value);
  }

  function handleScrapeClick() {
    let errorFlag: Boolean = false;
    let errorReturn = {
      url: "",
      selector: "",
      attribute: "",
    };

    if (selector.length === 0) {
      errorReturn.selector = "Please enter a valid CSS selector";
      errorFlag = true;
    }

    if (url.length === 0) {
      errorReturn.url = "Please enter a valid URL";
      errorFlag = true;
    }

    if (attribute.length === 0 && dataType === "attribute") {
      errorReturn.attribute = "Please enter a valid attribute";
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
        attribute: dataType === "attribute" ? attribute : "",
      })
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        setError({ ...error, url: "URL could not be reached" });
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
    <>
      {fetching && (
        <LinearProgress
          color="secondary"
          style={{ position: "absolute", width: "100%" }}
        />
      )}
      <Container maxWidth="md" style={{ marginTop: "1.5rem" }}>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
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
                {dataType === "attribute" && (
                  <TextField
                    variant="outlined"
                    onChange={handleAttributeInputChange}
                    value={attribute}
                    label="Attribute"
                    placeholder="Ex: href"
                    size="small"
                    disabled={fetching}
                    error={error.attribute.length > 0}
                    helperText={
                      error.attribute.length > 0 ? error.attribute : " "
                    }
                    style={{ marginRight: "1rem" }}
                  />
                )}
                <FormControl style={{ marginBottom: "1rem" }}>
                  <InputLabel>Data to fetch:</InputLabel>
                  <Select
                    label="Data"
                    value={dataType}
                    onChange={handleDataTypeChange}
                    style={{ width: "120px", marginRight: "1rem" }}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="attribute">Attribute</MenuItem>
                  </Select>
                </FormControl>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
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
                </div>
              </div>
            </div>
          </Grid>
          <Results results={results} fetching={fetching} />
        </Grid>
      </Container>
    </>
  );
}

export default App;
