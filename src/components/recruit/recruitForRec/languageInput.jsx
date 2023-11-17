import React, { useState } from "react";
import css from "./recruitFrec.module.css";
const LanguageInput = ({
  languageData,
  setSelectedLanguages,
  selectedLanguages,
  inputData,
  setInputData,
}) => {
  const handleLanguageChange = (event) => {
    const inputText = event.target.value.toLowerCase();
    const filteredLanguages = Object.keys(languageData)
      .filter((key) =>
        languageData[key].native.toLowerCase().includes(inputText)
      )
      .map((key) => ({ lang: languageData[key].native, level: "" }));

    setSelectedLanguages(filteredLanguages);
    setInputData({ lang: inputText, level: inputData.level });
  };

  const handleLanguageSelect = (selectedLanguage) => {
    setInputData({ ...inputData, lang: selectedLanguage });
    setSelectedLanguages([...selectedLanguages]);
  };

  const handleLevelSelect = (selectedLevel) => {
    setInputData({ ...inputData, level: selectedLevel });
  };

  const handleAddLanguage = () => {
    if (inputData.lang && inputData.level) {
      setSelectedLanguages([...selectedLanguages, inputData]);
      setInputData({ lang: "", level: "" });
    }
  };

  return (
    <div className={css.wrapLengLev}>
      <div className={css.wrapL}>
        <select
          className={css.lanWr}
          value={inputData.lang}
          onChange={(e) => handleLanguageSelect(e.target.value)}
        >
          <option value="" disabled>
            Виберіть мову
          </option>
          {Object.keys(languageData).map((key) => (
            <option key={key} value={languageData[key].native}>
              {languageData[key].native}
            </option>
          ))}
        </select>
        {inputData.lang && (
          <div className={css.randDiv}>
            <select
              className={css.lanWrW}
              value={inputData.level}
              onChange={(e) => handleLevelSelect(e.target.value)}
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button className={css.buttonLang} onClick={handleAddLanguage}>
              Add Language
            </button>
          </div>
        )}
      </div>
      <div className={css.therk}>
        <h3 className={css.haveLan}>Володіння мовами</h3>
        <ul className={css.haveLUl}>
          {selectedLanguages.map((langObj, index) => (
            <li className={css.liliUl} key={index}>
              {langObj.lang} - {langObj.level}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LanguageInput;
