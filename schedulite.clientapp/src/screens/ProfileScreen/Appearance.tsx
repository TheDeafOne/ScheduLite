import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";

interface AppearanceSettings {
  colorScheme: string;
  font: string;
  fontSize: number;
  backgroundColor: string;
  layout: string;
  spacing: number;
  darkMode: boolean;
  customCss: string;
}

const defaultSettings: AppearanceSettings = {
  colorScheme: "default",
  font: "Arial",
  fontSize: 16,
  backgroundColor: "#FFFFFF",
  layout: "default",
  spacing: 8,
  darkMode: false,
  customCss: "",
};

const colorSchemes = [
  "default",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "yellow",
];

const fonts = ["Arial", "Helvetica", "Verdana", "Times New Roman", "Georgia"];

const layouts = ["default", "sidebar-left", "sidebar-right", "full-width"];

const Appearance = () => {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultSettings);

  const handleColorSchemeChange = (event: SelectChangeEvent<string>) => {
    setSettings({ ...settings, colorScheme: event.target.value });
  };

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      font: event.target.value,
    }));
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      fontSize: parseInt(event.target.value),
    }));
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      backgroundColor: event.target.value,
    }));
  };

  const handleLayoutChange = (event:SelectChangeEvent<string>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      layout: event.target.value,
    }));
  };

  const handleSpacingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      spacing: parseInt(event.target.value),
    }));
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      darkMode: event.target.checked,
    }));
  };

  const handleCustomCssChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      customCss: event.target.value,
    }));
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Appearance Settings</h1>

      <div>
          <FormControl variant="outlined" style={{ minWidth: "250px", marginBottom: "10px" }}>
            <InputLabel id="colorScheme-label">Color Scheme</InputLabel>
            <Select
              labelId="colorScheme-label"
              id="colorScheme"
              value={settings.colorScheme}
              onChange={handleColorSchemeChange}
            >
              {colorSchemes.map((colorScheme) => (
                <MenuItem key={colorScheme} value={colorScheme}>
                  {colorScheme}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </div>

      <div>
          <FormControl variant="outlined" style={{ minWidth: "250px", marginBottom: "10px" }}>
            <InputLabel id="font-label">Font</InputLabel>
            <Select
              labelId="font-label"
              id="font"
              value={settings.font}
              onChange={handleFontChange}
            >
              {fonts.map((font) => (
                <MenuItem key={font} value={font}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </div>

      <div >
        {/*<label htmlFor="fontSize" style={{ color: "white" }}>*/}
        {/*  Font Size:*/}
        {/*</label>*/}
          <TextField
            id="outlined-basic"
            label="Font Size"
            variant="outlined"
            type="number"
            value={settings.fontSize}
            onChange={handleFontSizeChange}
            style={{ minWidth: "250px", marginBottom: "10px" }}
          />
      </div>

      <div>
          <TextField
            id="outlined-basic"
            label="Background Color"
            variant="outlined"
            type="color"
            value={settings.backgroundColor}
            onChange={handleBackgroundColorChange}
            // style={{minWidth: 250}}
            style={{ minWidth: "250px", marginBottom: "10px" }}
          />
      </div>

      <div>
          <FormControl variant="outlined" style={{ minWidth: "250px", marginBottom: "10px" }}>
            <InputLabel id="layout-label">Layout</InputLabel>
            <Select
              labelId="layout-label"
              id="layout"
              value={settings.layout}
              onChange={handleLayoutChange}
            >
              {layouts.map((layout) => (
                <MenuItem key={layout} value={layout}>
                  {layout}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </div>

      <div>
          <TextField
            id="outlined-basic"
            label="Spacing"
            variant="outlined"
            type="number"
            value={settings.spacing}
            onChange={handleSpacingChange}
            style={{ minWidth: "250px", marginBottom: "10px" }}
          />
      </div>

      <div>
          <FormControlLabel
            control={
              <Checkbox
                id="darkMode"
                checked={settings.darkMode}
                onChange={handleDarkModeChange}
                color="primary"
              />
            }
            style={{color: "white"}}
            label="Enable Dark Mode"
          />
      </div>

      <div>
        <label htmlFor="customCss" style={{ color: "white" }}>
          Custom CSS
          <br />
          <TextField
            id="outlined-multiline"
            label="Custom CSS"
            variant="outlined"
            multiline
            rows={4}
            value={settings.customCss}
            onChange={handleCustomCssChange}
          />
        </label>
      </div>

      <div>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log(settings)}
        >
          Save Settings
        </Button>
      </div>
    </div>
);
};


  export default Appearance;
