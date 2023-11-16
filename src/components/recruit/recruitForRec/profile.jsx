import { useEffect, useState } from "react";
import css from "./recruitFrec.module.css";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import { continents, countries, languages } from "countries-list";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

const Profile = ({ data }) => {
  const [posada, setPosada] = useState("");
  const [napram, setNapram] = useState("");
  const [exp, steExp] = useState("");
  const [payment, setPayment] = useState("");
  const [countryC, setCountryC] = useState("");
  const allCountries = countries;
  const [areaExp, setAreaExp] = useState("");
  // Стани для другого варіанту
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  // Стани для другого варіанту
  const [isChecked11, setIsChecked11] = useState(false);
  const [isChecked22, setIsChecked22] = useState(false);
  const [isChecked33, setIsChecked33] = useState(false);
  const [isChecked44, setIsChecked44] = useState(false);
  const [isChecked55, setIsChecked55] = useState(false);
  const [isChecked66, setIsChecked66] = useState(false);
  const [achievement, setAchievement] = useState("");
  const [expectation, setExpectation] = useState("");
  const [hourPrice, setHourPrice] = useState("");
  const [questionForE, setQuestionForE] = useState("");
  const textAreaExp = (e) => {
    const selectedPosada = e.target.value;

    setAreaExp(selectedPosada);
  };
  const yearGroup = [
    "немає досвіду",
    "6 місяців",
    "1 рік",
    "1.5 роки",
    "2 роки",
    "2.5 роки",
    "3 роки",
    "4 роки",
    "5 років",
    "6 років",
    "7 років",
    "8 років",
    "9 років",
    "10 років",
    "більще 10 років",
  ];

  const handleNapramChange = (e) => {
    const selectedPosada = e.target.value;

    setNapram(selectedPosada);
  };
  const handleExpChange = (e) => {
    const selectedPosada = e.target.value;

    steExp(selectedPosada);
  };

  //
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [language, setLanguage] = useState(0);
  const [cou, setCou] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [theId, setTheId] = useState("");
  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);
  useEffect(() => {}, [countryId]);
  return (
    <section className={css.profileWrap}>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Посада</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Категорія</p>
        <select
          className={css.inputStSelect}
          value={napram}
          onChange={handleNapramChange}
        >
          <option disabled value="">
            -- Оберіть категорію --
          </option>
          {data.map((el, index) => (
            <optgroup key={index} label={el.name.nameProf}>
              {el.name.fullProf.map((prof, indexO) => (
                <option key={indexO} value={prof}>
                  {prof}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className={css.wrapSec}>
        <p className={css.pPosada}>Досвід роботи</p>
        <select
          className={css.inputStSelect}
          value={exp}
          onChange={handleExpChange}
        >
          <option disabled value="">
            -- Оберіть свій досвід --
          </option>
          {yearGroup.map((el, index) => (
            <option key={index} value={el}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Зарплатні очікування</p>
        <input
          className={css.inputSt}
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Країна перебування</p>
          <p className={css.pPosadaSmall}>Країна, де ви знаходитесь зараз.</p>
        </div>
        <select
          className={css.inputStSelect}
          onChange={(e) => {
            const selectedCountry = countryList[e.target.value];
            setCountryId(selectedCountry.name);

            setTheId(selectedCountry.id);
            GetState(selectedCountry.id).then((result) => {
              setStateList(result);
            });
          }}
          value={
            countryList.findIndex((item) => item.name === countryId) !== -1
              ? countryList.findIndex((item) => item.name === countryId)
              : ""
          } // змінено умову вибору значення
        >
          <option disabled={!countryId} value="">
            -- Оберіть країну перебування --
          </option>
          {countryList.map((item, index) => (
            <option key={index} value={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Область</p>
          <p className={css.pPosadaSmall}>Виберіть область</p>
        </div>

        <select
          className={css.inputStSelect}
          onChange={(e) => {
            const selectedState = stateList[e.target.value];
            setStateId(selectedState.id);

            GetCity(theId, selectedState.id).then((result) => {
              setCityList(result);
            });
          }}
          value={
            stateList.findIndex((item) => item.id === stateId) !== -1
              ? stateList.findIndex((item) => item.id === stateId)
              : ""
          }
        >
          <option disabled={!stateId} value="">
            -- Оберіть область --
          </option>
          {stateList.map((item, index) => (
            <option key={index} value={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Місто</p>
          <p className={css.pPosadaSmall}>Виберіть населений пункт</p>
        </div>
        <div className={css.wrapCountWhi}>
          <select
            className={css.inputStSelectA}
            onChange={(e) => {
              const selectedCity = cityList[e.target.value];
              setCityId(selectedCity.id);
            }}
            value={
              cityList.findIndex((item) => item.id === cityId) !== -1
                ? cityList.findIndex((item) => item.id === cityId)
                : ""
            }
          >
            <option disabled={!cityId} value="">
              -- Оберіть місто --
            </option>
            {cityList.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>

          <div className={css.checkWrap}>
            {/* Перший варіант */}
            <label className={css.laberCheck}>
              <input
                className={css.checkBoxStyle}
                type="checkbox"
                checked={isChecked1}
                onChange={() => setIsChecked1(!isChecked1)}
              />
              <p className={css.checkP}>Можу працювати та бути на зв'язку</p>
            </label>

            {/* Другий варіант */}
            <label className={css.laberCheck}>
              <input
                type="checkbox"
                checked={isChecked2}
                onChange={() => setIsChecked2(!isChecked2)}
              />
              <p className={css.checkP}>Можу виїхати за потреби</p>
            </label>

            {/* Третій варіант */}
            <label className={css.laberCheck}>
              <input
                type="checkbox"
                checked={isChecked3}
                onChange={() => setIsChecked3(!isChecked3)}
              />
              <p className={css.checkP}>Розглядаю переїзд в іншу країну</p>
            </label>
          </div>
        </div>
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Рівень англійської</p>
        <div className={css.checkWrapLevel}>
          {/* Перший варіант */}
          <label className={css.laberCheck}>
            <input
              className={css.checkBoxStyle}
              type="radio"
              name="englishLevel"
              checked={isChecked11}
              onChange={() => setIsChecked11(!isChecked11)}
            />
            <p className={css.checkP}>No English</p>
          </label>

          {/* Другий варіант */}
          <label className={css.laberCheck}>
            <input
              type="radio"
              name="englishLevel"
              checked={isChecked22}
              onChange={() => setIsChecked22(!isChecked22)}
            />
            <p className={css.checkP}>Beginner/Elementary</p>
          </label>

          {/* Третій варіант */}
          <label className={css.laberCheck}>
            <input
              type="radio"
              name="englishLevel"
              checked={isChecked33}
              onChange={() => setIsChecked33(!isChecked33)}
            />
            <p className={css.checkP}>Pre-Intermediate</p>
          </label>

          <label className={css.laberCheck}>
            <input
              className={css.checkBoxStyle}
              type="radio"
              name="englishLevel"
              checked={isChecked44}
              onChange={() => setIsChecked44(!isChecked44)}
            />
            <p className={css.checkP}>Intermediate</p>
          </label>

          <label className={css.laberCheck}>
            <input
              className={css.checkBoxStyle}
              type="radio"
              name="englishLevel"
              checked={isChecked55}
              onChange={() => setIsChecked55(!isChecked55)}
            />
            <p className={css.checkP}>Upper-Intermediate</p>
          </label>

          <label className={css.laberCheck}>
            <input
              className={css.checkBoxStyle}
              type="radio"
              name="englishLevel"
              checked={isChecked66}
              onChange={() => setIsChecked66(!isChecked66)}
            />
            <p className={css.checkP}>Advanced/Fluent</p>
          </label>
        </div>
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Досвід роботи</p>
          <p className={css.pPosadaSmall}>
            Розкажіть, які проекти та задачі виконували, які технології
            використовували, ваша роль у команді зараз, і куди бажаєте
            розвиватися.
          </p>
        </div>
        <textarea
          className={css.areaSt}
          value={areaExp}
          onChange={textAreaExp}
        />
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Досягнення</p>
          <p className={css.pPosadaSmall}>
            Чим конкретніше, тим краще. Для цікавих пропозицій must have.
          </p>
        </div>
        <textarea
          className={css.areaSt}
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Очікування</p>
          <p className={css.pPosadaSmall}>
            Напишіть, чого хочете від роботи. І чого не хочете теж напишіть.
          </p>
        </div>
        <textarea
          className={css.areaSt}
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Погодинна ставка</p>
        <input
          className={css.inputSt}
          value={hourPrice}
          onChange={(e) => setHourPrice(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <div className={css.pWrapBig}>
          <p className={css.pPosada}>Питання для роботодавця</p>
          <p className={css.pPosadaSmall}>
            Що саме ви хотіли б дізнатись в першу чергу?
          </p>
        </div>
        <textarea
          className={css.areaSt}
          value={questionForE}
          onChange={(e) => setQuestionForE(e.target.value)}
        />
      </div>
    </section>
  );
};
export default withFirebaseCollection("professions")(Profile);
