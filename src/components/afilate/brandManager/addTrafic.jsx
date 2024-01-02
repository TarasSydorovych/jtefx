import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import css from "./recruitFhr.module.css";
import { useEffect, useState } from "react";
import { checkRegistration } from "../../../function/authUtils";
import { v4 as uuidv4 } from "uuid";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../function/firebase";
import HeaderForBrand from "../../standartComponent/header/headerForBrand";
const AddTrafic = ({ data }) => {
  const uid = uuidv4();
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [questionForE, setQuestionForE] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [achievement, setAchievement] = useState("");
  const [cantryTo, setCantryTo] = useState("");
  const [caontryToSt, setCaontryToSt] = useState("");
  const [theId, setTheId] = useState("");
  const [posada, setPosada] = useState("");
  const [traficSource, setTraficSource] = useState("");
  const [countryListTwo, setCountryListTwo] = useState([]);
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);

  const updateUserDataInFirebase = async () => {
    try {
      const vacanciesCollection = collection(db, "trafic");
      const currentDate = new Date();
      // Створення об'єкта з даними для додавання до колекції
      const vacancyData = {
        uid,
        userId,
        lidPrice: posada,
        mainCountry: { countryId: countryId, theId: theId },
        secondCountry: { countryId: cantryTo, theId: caontryToSt },
        cr: achievement,
        funnels: questionForE,
        traficSource: traficSource,
        date: currentDate,
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
  const codingCom = (e) => {
    setAchievement(e.target.value);
  };
  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });
    GetCountries().then((result) => {
      setCountryListTwo(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);
  return (
    <>
      {currentUser && <HeaderForBrand currentUser={currentUser} />}
      <section className={css.wrapAddVac}>
        <h1 className={css.h1AddV}>Додайте заявку</h1>
        <div className={css.profileWrap}>
          <div className={css.wrapSec}>
            <p className={css.pPosada}>Ціна за ліда в $</p>
            <input
              className={css.inputSt}
              value={posada}
              onChange={(e) => setPosada(e.target.value)}
            />
          </div>

          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>Основне гео</p>
              <p className={css.pPosadaSmall}>Лакація з якої беруть трафік</p>
            </div>
            <select
              className={css.inputStSelect}
              onChange={(e) => {
                const selectedCountry = countryList[e.target.value];
                setCountryId(selectedCountry.name);

                setTheId(selectedCountry.iso2);
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
                -- Оберіть країну --
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
              <p className={css.pPosada}>Другорядне гео(за потреби)</p>
              <p className={css.pPosadaSmall}>Лакація з якої беруть трафік</p>
            </div>
            <select
              className={css.inputStSelect}
              onChange={(e) => {
                const selectedCountry = countryList[e.target.value];
                setCantryTo(selectedCountry.name);

                setCaontryToSt(selectedCountry.iso2);
                GetState(selectedCountry.id).then((result) => {
                  setStateList(result);
                });
              }}
              value={
                countryListTwo.findIndex((item) => item.name === cantryTo) !==
                -1
                  ? countryListTwo.findIndex((item) => item.name === cantryTo)
                  : ""
              } // змінено умову вибору значення
            >
              <option disabled={!cantryTo} value="">
                -- Оберіть країну --
              </option>
              {countryListTwo.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>CR</p>
              <p className={css.pPosadaSmall}>
                Процент лідів які мають закритись з 100
              </p>
            </div>
            <input
              className={css.inputSt}
              value={achievement}
              onChange={codingCom}
            />
          </div>
          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>Funnels</p>
              <p className={css.pPosadaSmall}>Опис</p>
            </div>
            <input
              className={css.inputSt}
              value={questionForE}
              onChange={(e) => setQuestionForE(e.target.value)}
            />
          </div>
          <div className={css.wrapSec}>
            <div className={css.pWrapBig}>
              <p className={css.pPosada}>Traffic Source</p>
              <p className={css.pPosadaSmall}>Джерела трафіку</p>
            </div>
            <input
              className={css.inputSt}
              value={traficSource}
              onChange={(e) => setTraficSource(e.target.value)}
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
export default withFirebaseCollection("users")(AddTrafic);
