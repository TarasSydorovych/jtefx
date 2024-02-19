import { useParams, useNavigate } from "react-router-dom";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import { useEffect, useState } from "react";
import HeaderForRecruit from "../standartComponent/header/headerForRecruit";
import css from "./workerPage.module.css";
import { FaEarthAsia } from "react-icons/fa6";
import { PiLightningFill } from "react-icons/pi";
import { FaLanguage } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../function/firebase";
import HeaderForHr from "../standartComponent/header/headerForHr";
const WorkerPage = ({ data, userId }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();
  const [contactUser, setContactUser] = useState(null);
  const [userForHeader, setUserForHeader] = useState(null);
  useEffect(() => {
    // Знаходимо користувача в масиві за його id
    const user = data.find((user) => user.userId === numericId);
    const userMain = data.find((user) => user.userId === userId);
    // Якщо знайдено, встановлюємо дані в стан
    console.log(typeof userId);
    if (userMain) {
      setUserForHeader(userMain);
    }
    if (user) {
      setUserData(user);
    }
  }, [data, id, userId]);
  const sendMessage = (id) => {
    navigate(`/chat/${id}`);
  };
  const openContact = async (id) => {
    const usersCollection = collection(db, "users");
    console.log("id", id);
    // Створіть запит, який вибирає користувача з полем userId, що дорівнює вказаному значенню
    const q = query(usersCollection, where("userId", "==", parseInt(userId)));
    const q1 = query(usersCollection, where("userId", "==", parseInt(id)));
    try {
      // Отримайте дані користувача з відповідного запиту
      const querySnapshot = await getDocs(q);
      const querySnapshot1 = await getDocs(q1);
      // Перевірте, чи знайдено хоча б одного користувача
      if (!querySnapshot.empty && !querySnapshot1.empty) {
        // Отримайте перший знайдений документ (користувача)
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const userDoc1 = querySnapshot1.docs[0];
        const userData1 = userDoc1.data();
        // Тепер ви можете використовувати дані користувача (userData) за необхідністю
        if (
          isNaN(userData.balance) ||
          isNaN(data[0].price) ||
          data[0].price >= parseInt(userData.balance)
        ) {
          alert(
            "У вас недостатньо коштів на балансі. Будь ласка поповніть свій рахунок"
          );
          navigate("/pay");
        } else {
          console.log("ми зайшли", userData.uid);
          const existingOpenUser = userData.openuser || [];

          if (!existingOpenUser.includes(id)) {
            const userDocRef = doc(db, "users", userData.uid);
            const newOpenUser = [...existingOpenUser, id];
            await updateDoc(userDocRef, {
              balance: parseInt(userData.balance) - data[0].price,
              openuser: newOpenUser,
            });

            setContactUser(userData1);
          } else {
            setContactUser(userData1);
          }
        }
      } else {
        console.log("ми не зайшли");
      }
    } catch (error) {
      console.error("Помилка при отриманні користувача:", error);
    }
  };

  return (
    <>
      {userForHeader && userForHeader.role === "worker" && (
        <HeaderForRecruit currentUser={userForHeader} />
      )}
      {userForHeader && userForHeader.role === "hr" && (
        <HeaderForHr currentUser={userForHeader} />
      )}

      {userData && (
        <section className={css.anketaWrap}>
          <div className={css.smallWrap}>
            <div className={css.anotherWrap}>
              <h1 className={css.mainVac}>{userData.posada}</h1>

              <p className={css.allPdesc}>Досвід</p>
              <p className={css.pAllDesc}>{userData.workExp}</p>
              <p className={css.allPdesc}>Досягнення</p>
              <p className={css.pAllDesc}>{userData.achievement}</p>
              <p className={css.allPdesc}>Мови спідкування</p>
              <ul className={css.languageUl}>
                {userData.language.map((el, index) => {
                  return (
                    <li className={css.languageLi} key={index}>
                      {el.lang}
                    </li>
                  );
                })}
              </ul>
              {contactUser && (
                <>
                  {contactUser.firstName.length > 0 && (
                    <p className={css.pMain}>Імʼя: {contactUser.firstName} </p>
                  )}
                  {contactUser.username.length > 0 && (
                    <p className={css.pMain}>
                      Логін в телеграм: {contactUser.username}{" "}
                    </p>
                  )}
                  {contactUser.mail.length > 0 && (
                    <p className={css.pMain}>Email: {contactUser.mail} </p>
                  )}
                  {contactUser.phone.length > 0 && (
                    <p className={css.pMain}>Телефон: {contactUser.phone} </p>
                  )}
                </>
              )}
              {userData.userId !== userId && (
                <div className={css.wrapButton}>
                  <button
                    onClick={() => sendMessage(userData.userId)}
                    className={css.buttonCont}
                  >
                    Написати повідомлення
                  </button>
                  <button
                    onClick={() => openContact(userData.userId)}
                    className={css.buttonCont}
                  >
                    Відкрити контакти
                  </button>
                </div>
              )}
            </div>
            <div className={css.wrapSmExp}>
              <p className={css.firstPVal}>${userData.paymantRel}/місяць</p>
              <div className={css.restInfoWrap}>
                <p className={css.informTr}>
                  <FaEarthAsia className={css.faEarthAsia} />
                  {userData.country.countryId}, {userData.city}
                </p>
                <p className={css.informTr}>
                  <PiLightningFill className={css.faEarthAsia} />
                  {userData.experience}
                </p>
                <p className={css.informTrd}>
                  <FaLanguage className={css.faEarthAsia} />
                  <div className={css.informTrLand}>
                    {userData.language.map((el, index) => {
                      return (
                        <div className={css.languageWrapWt} key={index}>
                          {el.lang}: {el.level}
                        </div>
                      );
                    })}
                  </div>
                </p>
                {userData.canWork && (
                  <p className={css.informTr}>
                    <FaCheck className={css.faEarthAsia} />
                    Віддалена робота
                  </p>
                )}
                {userData.canRelocate && (
                  <p className={css.informTr}>
                    <FaCheck className={css.faEarthAsia} />
                    Може виїхати за потреби
                  </p>
                )}
                {userData.canRelocateCantry && (
                  <p className={css.informTr}>
                    <FaCheck className={css.faEarthAsia} />
                    Розглядає переїзд в іншу країну
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default withFirebaseCollection("users")(WorkerPage);
