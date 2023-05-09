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

  const handleColorSchemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      colorScheme: event.target.value,
    }));
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleLayoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <label htmlFor="colorScheme" style={{ color: "white" }}>
        Color Scheme:
        <select
          id="colorScheme"
          value={settings.colorScheme}
          onChange={handleColorSchemeChange}
          
        >
          {colorSchemes.map((colorScheme) => (
            <option key={colorScheme} value={colorScheme}>
              {colorScheme}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="font" style={{ color: "white" }}>
        Font:
        <select
          id="font"
          value={settings.font}
          onChange={handleFontChange}
          
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="fontSize" style={{ color: "white" }}>
        Font Size:
        <input
          id="fontSize"
          type="number"
          value={settings.fontSize}
          onChange={handleFontSizeChange}
        />
      </label>
      <br />
      <label htmlFor="backgroundColor" style={{ color: "white" }}>
        Background Color:
        <input
          id="backgroundColor"
          type="color"
          value={settings.backgroundColor}
          onChange={handleBackgroundColorChange}
        />
      </label>
      <br />
      <label htmlFor="layout" style={{ color: "white" }}>
        Layout:
        <select
          id="layout"
          value={settings.layout}
          onChange={handleLayoutChange}
        >
          {layouts.map((layout) => (
            <option key={layout} value={layout}>
              {layout}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label htmlFor="spacing" style={{ color: "white" }}>
        Spacing:
        <input
          id="spacing"
          type="number"
          value={settings.spacing}
          onChange={handleSpacingChange}
        />
      </label>
      <br />
      <label htmlFor="darkMode" style={{ color: "white" }}>
        Dark Mode:
        <input
          id="darkMode"
          type="checkbox"
          checked={settings.darkMode}
          onChange={handleDarkModeChange}
        />
      </label>
      <br />
      <label htmlFor="customCss" style={{ color: "white" }}>
        Custom CSS:
        <br />
        <textarea
          id="customCss"
          value={settings.customCss}
          onChange={handleCustomCssChange}
        />
      </label>
      <br />
      <button onClick={() => console.log(settings)} style={{ color: "black" }}>
        Save Settings
      </button>
    </div>
  );
  };
  
  export default Appearance;
  