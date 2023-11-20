import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import css from "./recruitFhr.module.css";
import { useEffect, useState } from "react";
import { checkRegistration } from "../../../function/authUtils";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../../../function/firebase";
const AddVac = ({ data }) => {
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityFotrBase, setCityFotrBase] = useState("");
  const [cityList, setCityList] = useState([]);
  const [questionForE, setQuestionForE] = useState("");
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [misto, setMisto] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState("");

  const [achievement, setAchievement] = useState("");

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [theId, setTheId] = useState("");
  const [posada, setPosada] = useState("");
  const [professionsData, setProfessionsData] = useState([]);
  const [exp, setExp] = useState("");
  const [napram, setNapram] = useState("");
  const handleExpChange = (e) => {
    const selectedPosada = e.target.value;

    setExp(selectedPosada);
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
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  useEffect(() => {
    const fetchProfessionsData = async () => {
      const professionsCollection = collection(db, "professions");

      try {
        const querySnapshot = await getDocs(professionsCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionsData(data);
      } catch (error) {
        console.error("Error fetching professions data:", error);
      }
    };

    fetchProfessionsData();
  }, []);
  const handleNapramChange = (e) => {
    const selectedPosada = e.target.value;

    setNapram(selectedPosada);
  };
  const updateUserDataInFirebase = async () => {
    try {
      const vacanciesCollection = collection(db, "vacancies");

      // Створення об'єкта з даними для додавання до колекції
      const vacancyData = {
        userId,
        posada,
        napram,
        exp,
        country: { countryId: countryId, theId: theId },
        region: { cityFotrBase: cityFotrBase, stateId: stateId },
        city: misto,
        isChecked1,
        isChecked2,
        isChecked3,
        achievement,
        questionForE,
        // Додайте інші поля за необхідності
      };

      // Додавання даних до колекції
      const docRef = await addDoc(vacanciesCollection, vacancyData);

      // Отримання ID новоствореного документа (вашого вакансії)
      const newVacancyId = docRef.id;

      // Організація перезавантаження сторінки після успішного додавання
      if (newVacancyId) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  useEffect(() => {
    if (currentUser) {
      GetState(currentUser.country.theId).then((result) => {
        setStateList(result);
      });
      GetCity(currentUser.country.theId, currentUser.region.stateId).then(
        (result) => {
          setCityList(result);
        }
      );
    }
  }, [currentUser]);
  return (
    <>
      {currentUser && <HeaderForHr currentUser={currentUser} />}
      <section className={css.wrapAddVac}>
        <h1 className={css.h1AddV}>Додайте вакансію</h1>
        <div className={css.profileWrap}>
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
              {professionsData.map((el, index) => (
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
            <p className={css.pPosada}>Необхідний досвід</p>
            <select
              className={css.inputStSelect}
              value={exp}
              onChange={handleExpChange}
            >
              <option disabled value="">
                -- Оберіть необхідний досвід --
              </option>
              {yearGroup.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>

          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>Країна</p>
              <p className={css.pPosadaSmall}>Країна</p>
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
                setCityFotrBase(selectedState.name);

                GetCity(theId, selectedState.id).then((result) => {
                  setCityList(result);
                });
              }}
              value={
                stateList.findIndex((item) => item.name === cityFotrBase) !== -1
                  ? stateList.findIndex((item) => item.name === cityFotrBase)
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
                  setMisto(selectedCity.name);
                }}
                value={
                  cityList.findIndex((item) => item.name === misto) !== -1
                    ? cityList.findIndex((item) => item.name === misto)
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
                  <p className={css.checkP}>
                    Може працювати та бути на зв'язку
                  </p>
                </label>

                {/* Другий варіант */}
                <label className={css.laberCheck}>
                  <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={() => setIsChecked2(!isChecked2)}
                  />
                  <p className={css.checkP}>Може виїхати за потреби</p>
                </label>

                {/* Третій варіант */}
                <label className={css.laberCheck}>
                  <input
                    type="checkbox"
                    checked={isChecked3}
                    onChange={() => setIsChecked3(!isChecked3)}
                  />
                  <p className={css.checkP}>За потреби переїзд в іншу країну</p>
                </label>
              </div>
            </div>
          </div>
          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>Опис вакансії</p>
              <p className={css.pPosadaSmall}>
                Опишіть детально Вашу пропозицію
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
              <p className={css.pPosada}>Опишіть Вашу компанію</p>
              <p className={css.pPosadaSmall}>
                Опишіть Вашу компанію не вказуючи назву та особисті контакти
              </p>
            </div>
            <textarea
              className={css.areaSt}
              value={questionForE}
              onChange={(e) => setQuestionForE(e.target.value)}
            />
          </div>
        </div>
        <button onClick={updateUserDataInFirebase} className={css.addAllData}>
          Записати
        </button>
      </section>
    </>
  );
};
export default withFirebaseCollection("users")(AddVac);
