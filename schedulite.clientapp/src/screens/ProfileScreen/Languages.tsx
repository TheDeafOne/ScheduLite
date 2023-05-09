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
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr");
  const [dateTimeFormat, setDateTimeFormat] = useState<"short" | "long">(
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
    <div>
      <h1 style={{ color: "white" }}>Language Settings</h1>
      <FormControl>
        <InputLabel htmlFor="language-select" style={{ color: "white" }}>
          Select a language:
        </InputLabel>
        <Select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ color: "white" }}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {variantOptions.length > 0 && (
        <div>
          <FormControl>
            <InputLabel htmlFor="variant-select" style={{ color: "white" }}>
              Select a variant:
            </InputLabel>
            <Select
              id="variant-select"
              value={selectedVariant}
              onChange={handleVariantChange}
              style={{ color: "white" }}
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
      <div>
        <FormControl>
          <InputLabel htmlFor="direction-select" style={{ color: "white" }}>
            Select text direction:
          </InputLabel>
          <Select
            id="direction-select"
            value={textDirection}
            onChange={handleTextDirectionChange}
            style={{ color: "white" }}
          >
            <MenuItem value="ltr">Left-to-right</MenuItem>
            <MenuItem value="rtl">Right-to-left</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="datetime-format-select" style={{ color: "white" }}>
            Select date/time format:
          </InputLabel>
          <Select
            id="datetime-format-select"
            value={dateTimeFormat}
            onChange={handleDateTimeFormatChange}
            style={{ color: "white" }}
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
  );
  };
  
  export default Languages;
  
