import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import Header from "../../standartComponent/header/header";
import HeaderForRecruit from "../../standartComponent/header/headerForRecruit";
import css from "./recruitFrec.module.css";
import { checkRegistration } from "../../../function/authUtils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./profile";
const RecruitFrec = ({ data }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { firstName, userId } = checkRegistration();
  const [activeTab, setActiveTab] = useState("profile"); // Додайте стейт для відстеження активного елементу
  const [prof, setProf] = useState(true);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  const handleTabClick = (tabName) => {
    if (tabName === "profile") {
      setProf(true);
      setContact(false);
    }
    if (tabName === "contacts") {
      setProf(false);
      setContact(true);
    }
    setActiveTab(tabName);
  };
  return (
    <>
      {currentUser && <HeaderForRecruit currentUser={currentUser} />}
      <section className={css.wrapRecFrec}>
        <div className={css.wrapSmallFrec}>
          <h1 className={css.h1MyAco}>Мій акаунт</h1>
          <Link className={css.linkToProfile} to={`/recruit/my/${userId}`}>
            Дивитись мій профіль
          </Link>
          <ul className={css.ulList}>
            <li
              className={`${css.liList} ${
                activeTab === "profile" && css.activeTab
              }`}
              onClick={() => handleTabClick("profile")}
            >
              Профіль
            </li>
            <li
              className={`${css.liList} ${
                activeTab === "contacts" && css.activeTab
              }`}
              onClick={() => handleTabClick("contacts")}
            >
              Контакти
            </li>
          </ul>
          {prof && <Profile userId={userId} />}
        </div>
      </section>
    </>
  );
};
export default withFirebaseCollection("users")(RecruitFrec);
