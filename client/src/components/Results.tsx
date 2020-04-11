import React, { useState } from "react";
import {
  IconButton,
  TextareaAutosize,
  Tabs,
  Tab,
  Popover,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

type ResultsProps = {
  results: string[];
  fetching: Boolean;
};

export default function Results({ results, fetching }: ResultsProps) {
  const [format, setFormat] = useState(0); // default = Text
  const [anchorEl, setAnchorEl] = useState(null);
  const [cleanSettings, setCleanSettings] = useState({
    blank: false,
    trimWhitespace: false,
  });

  function cleanResults(resultsArray: string[]) {
    let cleanArray: string[] = resultsArray;

    if (cleanSettings.blank) {
      cleanArray = cleanArray.filter((result: string) => {
        return /\S/.test(result);
      });
    }

    if (cleanSettings.trimWhitespace) {
      cleanArray = cleanArray.map((result: string) => {
        return result.trim();
      });
    }

    return cleanArray;
  }

  function textAreaFormat(resultsArray: string[]) {
    switch (format) {
      case 0: // Text
        return resultsArray.join("\n");
      case 1: // Array
        return `[\`${resultsArray.join("`,\n`")}\`]`;
      case 2: // Number
        return resultsArray.map((item, n) => `${n + 1}.\t${item}`).join("\n");
      default:
        return resultsArray.join("\n");
    }
  }

  function handleFormatSelectChange(event: any, newValue: number) {
    setFormat(newValue);
  }

  function handleSettingsButtonClick(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleCheckboxChange(event: any) {
    setCleanSettings({
      ...cleanSettings,
      [event.currentTarget.name]: event.currentTarget.checked,
    });
  }

  function handlePopoverClose() {
    setAnchorEl(null);
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={format}
          onChange={handleFormatSelectChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="text" />
          <Tab label="array" />
          <Tab label="number" />
        </Tabs>
        <IconButton onClick={handleSettingsButtonClick}>
          <SettingsIcon />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <FormGroup style={{ margin: "0.5rem 1rem" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cleanSettings.blank}
                  onChange={handleCheckboxChange}
                  name="blank"
                />
              }
              label="Remove blank items"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={cleanSettings.trimWhitespace}
                  onChange={handleCheckboxChange}
                  name="trimWhitespace"
                />
              }
              label="Trim whitespace"
            />
          </FormGroup>
        </Popover>
      </div>
      <TextareaAutosize
        placeholder={fetching ? "I am being fetched..." : "Results"}
        value={textAreaFormat(cleanResults(results))}
        rowsMin={10}
        style={{ width: "100%", resize: "none" }}
      />
    </div>
  );
}
