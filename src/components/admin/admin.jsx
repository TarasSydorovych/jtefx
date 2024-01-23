import { useState } from "react";
import Header from "../standartComponent/header/header";
import css from "./admin.module.css";
import UserSet from "./userSet";
import VacancyUse from "./vacancyUse";
import BrandUseAdm from "./brandUseAdm";
import AfilateUseAdm from "./afilateUseAdm";
import axios from "axios";
import CardInput from "../creditCard/cardInput";

const Admin = () => {
  const [userUse, setUserUse] = useState(false);
  const [chatUse, setChatUse] = useState(false);
  const [vacancyUse, setVacancyUse] = useState(false);
  const [brandUse, setBrandUse] = useState(false);
  const [afilateUse, setAfilateUse] = useState(false);
  const userFun = () => {
    setUserUse(!userUse);
    setChatUse(false);
    setVacancyUse(false);
    setBrandUse(false);
    setAfilateUse(false);
  };
  const chatFun = () => {
    setUserUse(false);
    setChatUse(!chatUse);
    setVacancyUse(false);
    setBrandUse(false);
    setAfilateUse(false);
  };
  const vacancyFun = () => {
    setUserUse(false);
    setChatUse(false);
    setVacancyUse(!vacancyUse);
    setBrandUse(false);
    setAfilateUse(false);
  };
  const brandFun = () => {
    setUserUse(false);
    setChatUse(false);
    setVacancyUse(false);
    setBrandUse(!brandUse);
    setAfilateUse(false);
  };
  const afilateFun = () => {
    setUserUse(false);
    setChatUse(false);
    setVacancyUse(false);
    setBrandUse(false);
    setAfilateUse(!afilateUse);
  };

  const testWebhook = async () => {
    try {
      const webhookUrl = "http://localhost:3000/webhook"; // Замініть це на ваш реальний URL

      // Модель даних для тестового вебхука (змініть її відповідно до вашого API)
      const testData = {
        status: "success",
        modifiedDate: new Date().toISOString(),
        // Додайте інші необхідні дані для тестування
      };

      const response = await axios.post(webhookUrl, testData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Webhook test successful:", response.data);
    } catch (error) {
      console.error("Error testing webhook:", error.response.data);
    }
  };
  return (
    <>
      <Header />
      <div className={css.wrapAdmin}>
        <ul className={css.ulForAdmin}>
          <li className={css.liForAdmin} onClick={userFun}>
            Управління користувачами
          </li>

          <li className={css.liForAdmin} onClick={vacancyFun}>
            Управління вакансіями
          </li>
          <li className={css.liForAdmin} onClick={brandFun}>
            Управління заявками від бренд менеджерів
          </li>
          <li className={css.liForAdmin} onClick={afilateFun}>
            Управління від афілейт менеджерів
          </li>

          <li className={css.liForAdmin} onClick={testWebhook}>
            testWebhook
          </li>
        </ul>
        {userUse && <UserSet />}
        {vacancyUse && <VacancyUse />}
        {brandUse && <BrandUseAdm />}
        {afilateUse && <AfilateUseAdm />}
      </div>
    </>
  );
};
export default Admin;
