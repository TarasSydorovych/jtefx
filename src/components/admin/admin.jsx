import { useState } from "react";
import Header from "../standartComponent/header/header";
import css from "./admin.module.css";
import UserSet from "./userSet";
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
    setAfilateUse(afilateUse);
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
        </ul>
        {userUse && <UserSet />}
      </div>
    </>
  );
};
export default Admin;
