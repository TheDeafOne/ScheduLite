import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

type LanguageOption = {
  label: string;
  value: string;
  variantOptions?: LanguageVariant[];
};

type LanguageVariant = {
  label: string;
  value: string;
};

const languageOptions: LanguageOption[] = [
  {
    label: "English",
    value: "en",
    variantOptions: [
      { label: "US English", value: "us" },
      { label: "British English", value: "gb" },
    ],
  },
  {
    label: "Spanish",
    value: "es",
    variantOptions: [
      { label: "Spain", value: "es" },
      { label: "Latin America", value: "la" },
    ],
  },
  { label: "French", value: "fr" },
];

const Languages: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0].value
  );
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    languageOptions[0].variantOptions?.[0]?.value
  );
  const [textDirection] = useState<"ltr" | "rtl">("ltr");
  const [dateTimeFormat] = useState<"short" | "long">(
    "short"
  );

  const handleLanguageChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedLanguage(event.target.value);
    setSelectedVariant(undefined); // reset variant on changing the language
  };
  
  const handleVariantChange = (event: { target: { value: React.SetStateAction<string | undefined>; }; }) => {
    setSelectedVariant(event.target.value);
  };
  
  const handleTextDirectionChange = (event: { target: { value: string | ((prevState: "ltr" | "rtl") => "ltr" | "rtl"); }; }) => {
  };
  
  const handleDateTimeFormatChange = (event: { target: { value: string | ((prevState: "short" | "long") => "short" | "long"); }; }) => {
  };
  
  const selectedLanguageOption = languageOptions.find(
    (option) => option.value === selectedLanguage
  );
  const variantOptions = selectedLanguageOption?.variantOptions || [];
  
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h1 style={{ color: "white" }}>Language Settings</h1>
      <div>
      <FormControl style={{minWidth: 250}}>
        <InputLabel htmlFor="language-select" style={{ color: "white" }}>
          Select a language:
        </InputLabel>
        <Select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ color: "white", marginBottom: "10px" }}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {variantOptions.length > 0 && (
        <div style={{minWidth: 250}}>
          <FormControl style={{minWidth: 250}}>
            <InputLabel htmlFor="variant-select" style={{ color: "white" }}>
              Select a variant:
            </InputLabel>
            <Select
              id="variant-select"
              value={selectedVariant}
              onChange={handleVariantChange}
              style={{ color: "white", marginBottom: "10px" }}
            >
              {variantOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      <div style={{minWidth: 250}}>
        <FormControl style={{minWidth: 250}}>
          <InputLabel htmlFor="direction-select" style={{ color: "white" }}>
            Select text direction:
          </InputLabel>
          <Select
            id="direction-select"
            value={textDirection}
            onChange={handleTextDirectionChange}
            style={{ color: "white", marginBottom: "10px" }}
          >
            <MenuItem value="ltr">Left-to-right</MenuItem>
            <MenuItem value="rtl">Right-to-left</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl style={{minWidth: 250}}>
          <InputLabel htmlFor="datetime-format-select" style={{ color: "white" }}>
            Select date/time format:
          </InputLabel>
          <Select
            id="datetime-format-select"
            value={dateTimeFormat}
            onChange={handleDateTimeFormatChange}
            style={{ color: "white", marginBottom: "10px" }}
          >
            <MenuItem value="short">Short format</MenuItem>
            <MenuItem value="long">Long format</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <p style={{ color: "white" }}>Selected language: {selectedLanguage}</p>
        {selectedVariant && (
          <p style={{ color: "white" }}>Selected variant: {selectedVariant}</p>
        )}
        <p style={{ color: "white" }}>Selected text direction: {textDirection}</p>
        <p style={{ color: "white" }}>Selected date/time format: {dateTimeFormat}</p>
      </div>
      </div>
    </div>
  );
  };
  
  export default Languages;
  
