import { Link, useNavigate } from "react-router-dom";
import css from "./recruitFhr.module.css";
import React, { useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../../function/firebase";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
const AllMyVac = ({ userVacancies, userId, data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
  const [contactUser, setContactUser] = useState(null);
  const handleToggleText = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
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
    <section className={css.myVacWr}>
      {userVacancies &&
        userVacancies.map((el, index) => {
          const decodedQuestionForE = decodeURIComponent(el.achievement);
          const truncatedText = decodedQuestionForE.substring(0, 178);
          const isExpanded = index === expandedIndex;
          if (el.check === true) {
            // Розділити текст за допомогою '\n' і використовувати <br> для переносу рядка
            const paragraphs = decodedQuestionForE
              .split("\n")
              .map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ));

            return (
              <div key={index} className={css.oneVacWr}>
                <div className={css.oneWr}>
                  <p className={css.pMain}>Вартість ліда: {el.lidPrice}$</p>
                  <p className={css.pMain}>
                    Гео трафіку:{" "}
                    {el.mainCountry &&
                      `${el.mainCountry.theId} (${el.mainCountry.countryId})`}
                    {el.secondCountry &&
                      el.secondCountry.theId &&
                      `, ${el.secondCountry.theId} (${el.secondCountry.countryId})`}
                  </p>
                  <div className={css.wrapBig}>
                    <p className={css.pMain}>CR: {el.cr}%</p>
                    <p className={css.smallp}>
                      Процент лідів які мають закритись з 100
                    </p>
                  </div>
                  <p className={css.pMain}>Funnels: {el.funnels}</p>
                  <div className={css.wrapBig}>
                    <p className={css.pMain}>
                      Traffic Source: {el.traficSource}
                    </p>
                    <p className={css.smallp}>Джерело трафіку</p>
                  </div>
                  <p className={css.pMain}>Коментар: {el.comment}</p>
                  {contactUser && (
                    <>
                      {contactUser.firstName.length > 0 && (
                        <p className={css.pMain}>
                          Імʼя: {contactUser.firstName}{" "}
                        </p>
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
                        <p className={css.pMain}>
                          Телефон: {contactUser.phone}{" "}
                        </p>
                      )}
                    </>
                  )}
                  {el.userId !== userId && (
                    <div className={css.wrapButton}>
                      <button
                        onClick={() => sendMessage(el.userId)}
                        className={css.buttonCont}
                      >
                        Написати повідомлення
                      </button>
                      <button
                        onClick={() => openContact(el.userId)}
                        className={css.buttonCont}
                      >
                        Відкрити контакти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
    </section>
  );
};
export default withFirebaseCollection("payment")(AllMyVac);
