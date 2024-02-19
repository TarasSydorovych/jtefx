import TelegramLoginButton from "react-telegram-login";
import css from "./auth.module.css";
import Header from "../standartComponent/header/header";
import { useEffect, useState } from "react";
import TelegramLogoutButton from "./logOut"; // Припустимо, що ваші файли розташовані в одній папці

import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../function/firebase";
import { checkRegistration } from "../../function/authUtils";
import clearRegistrationState from "../../function/authOut";
import axios from "axios";
// AuthTH

const Auth = () => {
  const [hr, setHr] = useState(false);
  const [worker, setWorker] = useState(false);
  const [brand, setBrand] = useState(false);
  const [afilate, setAfilate] = useState(false);
  const [fullRole, setFullRole] = useState("");
  const { isRegistered, role } = checkRegistration();
  const out = () => {
    clearRegistrationState();

    window.location.reload();
  };
  const clearCookies = async () => {};

  // Вивести всі кукі

  useEffect(() => {
    if (role === "hr") {
      setFullRole("Рекрутер");
    } else if (role === "worker") {
      setFullRole("Кандидат");
    } else if (role === "brand") {
      setFullRole("Brand manager");
    } else if (role === "afilate") {
      setFullRole("Affiliate manager");
    } else {
      setFullRole("");
    }
  }, [role, isRegistered]);
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      clearCookies();
    }
  }, [hr, worker, brand, afilate]);
  const recrut = () => {
    setHr(!hr);
    setWorker(false);
    setBrand(false);
    setAfilate(false);
  };
  const cand = () => {
    setHr(false);
    setWorker(!worker);
    setBrand(false);
    setAfilate(false);
  };
  const bra = () => {
    setHr(false);
    setWorker(false);
    setBrand(!brand);
    setAfilate(false);
  };
  const afil = () => {
    setHr(false);
    setWorker(false);
    setBrand(false);
    setAfilate(!afilate);
  };

  const handleTelegramResponse = async (response) => {
    try {
      // Перевірка, чи існує користувач з вказаним userId
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("userId", "==", response.id))
      );
      localStorage.setItem(
        "auth",
        JSON.stringify({
          firstName: response.first_name,
          userId: response.id,
          role: hr
            ? "hr"
            : worker
            ? "worker"
            : brand
            ? "brand"
            : afilate
            ? "afilate"
            : null,
        })
      );
      if (!querySnapshot.empty) {
        // Якщо користувач існує, просто зберегти інформацію в localStorage
        localStorage.setItem(
          "auth",
          JSON.stringify({
            firstName: response.first_name,
            userId: response.id,
            role: hr
              ? "hr"
              : worker
              ? "worker"
              : brand
              ? "brand"
              : afilate
              ? "afilate"
              : null,
          })
        );
      } else {
        let firstName = "";
        let userName = "";
        let userId = "";
        if (response.first_name) {
          firstName = response.first_name;
        }
        if (response.username) {
          userName = response.username;
        }
        if (response.id) {
          userId = response.id;
        }
        // Якщо користувач не існує, додати його до колекції
        const docRef = await addDoc(collection(db, "users"), {
          firstName: firstName,
          username: userName,
          userId: userId,
          balance: 0,
          inBlock: false,
          role: hr
            ? "hr"
            : worker
            ? "worker"
            : brand
            ? "brand"
            : afilate
            ? "afilate"
            : null,
          imageUlr: "",
          posada: "",
          categoryP: "",
          experience: "",
          paymantRel: "",
          country: "",
          region: "",
          city: "",
          canWork: "",
          canRelocate: "",
          canRelocateCantry: "",
          englishLevel: "",
          workExp: "",
          achievement: "",
          expectation: "",
          hourPayment: "",
          quesForHr: "",
          language: [],
          phone: "",
          mail: "",
          varning: [],
        });
        const uid = docRef.id;
        await updateDoc(docRef, { uid: uid });
        // Зберегти інформацію в localStorage
      }
      window.location.reload();
    } catch (e) {
      console.error("Error handling Telegram response: ", e);
    }
  };

  return (
    <>
      <Header />

      <section className={css.sectionAuthWrap}>
        {!isRegistered && (
          <div className={css.divAuthWrap}>
            <div className={css.buttonWrapAuth}>
              <div className={css.button} onClick={recrut}>
                Зареєструватись як рекрутер
              </div>
              <div className={css.button} onClick={cand}>
                Зареєструватись як кандитат
              </div>

              <div className={css.button} onClick={bra}>
                Зареєструватись як Brand manager
              </div>
              <div className={css.button} onClick={afil}>
                Зареєструватись як Affiliate manager
              </div>
            </div>
            <div className={css.wrapTg}>
              <p className={css.h1Reg}>
                Для реєстрації натисніть на кнопку та дотримуйтесь інструкцій
              </p>
              <div className={css.tga}>
                {hr && (
                  <TelegramLoginButton
                    usePic={false}
                    lang="uk"
                    color="white"
                    cornerRadius="5px"
                    dataOnauth={handleTelegramResponse}
                    botName="jtefx_bot"
                    className={css.telegram}
                  />
                )}
                {worker && (
                  <TelegramLoginButton
                    lang="uk"
                    dataOnauth={handleTelegramResponse}
                    botName="jtefx_bot"
                    className={css.telegram}
                  />
                )}
                {brand && (
                  <TelegramLoginButton
                    lang="uk"
                    dataOnauth={handleTelegramResponse}
                    botName="jtefx_bot"
                    className={css.telegram}
                  />
                )}
                {afilate && (
                  <TelegramLoginButton
                    lang="uk"
                    dataOnauth={handleTelegramResponse}
                    botName="jtefx_bot"
                    className={css.telegram}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {isRegistered && (
          <div className={css.divAuthWrapOut}>
            <h1 className={css.h1Reg}>Ви вже увійшли як {fullRole}</h1>
            <p className={css.h1Reg}>
              Якщо бажаєте вийти натисніть{" "}
              <span onClick={out} className={css.h1RegSpan}>
                Вийти
              </span>
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Auth;
