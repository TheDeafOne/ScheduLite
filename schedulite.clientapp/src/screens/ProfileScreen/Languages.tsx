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

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
    setSelectedVariant(undefined); // reset  variant onchanging the language
  };

  const handleVariantChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedVariant(event.target.value);
  };

  const handleTextDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTextDirection(event.target.value as "ltr" | "rtl");
  };

  const handleDateTimeFormatChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDateTimeFormat(event.target.value as "short" | "long");
  };

  const selectedLanguageOption = languageOptions.find(
    (option) => option.value === selectedLanguage
  );
  const variantOptions = selectedLanguageOption?.variantOptions || [];

  return (
    <div>
      <h1>Language Settings</h1>
      <label htmlFor="language-select">Select a language:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {variantOptions.length > 0 && (
        <div>
          <label htmlFor="variant-select">Select a variant:</label>
          <select
            id="variant-select"
            value={selectedVariant}
            onChange={handleVariantChange}
          >
            {variantOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="direction-select">Select text direction:</label>
        <select
          id="direction-select"
          value={textDirection}
          onChange={handleTextDirectionChange}
        >
          <option value="ltr">Left-to-right</option>
          <option value="rtl">Right-to-left</option>
          </select>
  </div>
  <div>
    <label htmlFor="datetime-format-select">
      Select date/time format:
    </label>
    <select
      id="datetime-format-select"
      value={dateTimeFormat}
      onChange={handleDateTimeFormatChange}
    >
      <option value="short">Short format</option>
      <option value="long">Long format</option>
    </select>
  </div>
  <div>
    <p>Selected language: {selectedLanguage}</p>
    {selectedVariant && <p>Selected variant: {selectedVariant}</p>}
    <p>Selected text direction: {textDirection}</p>
    <p>Selected date/time format: {dateTimeFormat}</p>
  </div>
</div>
  );
            };
            export default Languages;

