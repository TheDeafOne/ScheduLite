import { TextField } from "@mui/material";
import React, { useState } from "react";

type KeybindOption = {
  label: string;
  value: string;
};

type KeybindSection = {
  title: string;
  options: KeybindOption[];
};

const generalKeybinds: KeybindSection = {
  title: "General Keybinds",
  options: [
    { label: "Copy", value: "ctrl+c" },
    { label: "Paste", value: "ctrl+v" },
    { label: "Undo", value: "ctrl+z" },
    { label: "Redo", value: "ctrl+y" },
  ],
};

const navigationKeybinds: KeybindSection = {
  title: "Navigation Keybinds",
  options: [
    { label: "Switch Tabs", value: "ctrl+tab" },
    { label: "New Tab", value: "ctrl+t" },
    { label: "Close Tab", value: "ctrl+w" },
  ],
};

const textEditingKeybinds: KeybindSection = {
  title: "Text Editing Keybinds",
  options: [
    { label: "Select All", value: "ctrl+a" },
    { label: "Bold", value: "ctrl+b" },
    { label: "Italic", value: "ctrl+i" },
    { label: "Underline", value: "ctrl+u" },
  ],
};

const functionKeybinds: KeybindSection = {
  title: "Function Keybinds",
  options: [
    { label: "Save", value: "ctrl+s" },
    { label: "Print", value: "ctrl+p" },
    { label: "Search", value: "ctrl+f" },
  ],
};

const customKeybinds: KeybindSection = {
  title: "Custom Keybinds",
  options: [],
};

const keybindSections: KeybindSection[] = [
  generalKeybinds,
  navigationKeybinds,
  textEditingKeybinds,
  functionKeybinds,
  customKeybinds,
];

const Keybinds = () => {
  const [keybinds, setKeybinds] = useState<{ [key: string]: string }>({});

  const handleKeybindChange = (
    sectionTitle: string,
    optionLabel: string,
    value: string
  ) => {
    const newKeybinds = { ...keybinds };
    newKeybinds[`${sectionTitle}: ${optionLabel}`] = value;
    setKeybinds(newKeybinds);
  };
  
  return (
    <div>
      <h1 style={{ color: "white" }}>Keybind Settings</h1>
      {keybindSections.map((section) => (
        <div key={section.title}>
          <h2 style={{ color: "white" }}>{section.title}</h2>
          {section.options.map((option) => (
            <div key={option.label}>
              <label htmlFor={`${section.title}-${option.label}`} style={{ color: "white" }}>
                {option.label}:
              </label>
              <TextField
                id={`${section.title}-${option.label}`}
                value={keybinds[`${section.title}: ${option.label}`] || option.value}
                onChange={(e) =>
                  handleKeybindChange(section.title, option.label, e.target.value)
                }
                variant="outlined"
                style={{ color: "white" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  };
export default Keybinds;
