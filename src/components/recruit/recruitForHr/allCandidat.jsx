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
const AllCandidat = ({ allWorker, userId, data }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contactUser, setContactUser] = useState(null);
  const navigate = useNavigate();
  const handleToggleText = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  const sendMessage = (id) => {
    navigate(`/chat/${id}`);
  };
  const openContact = async (id) => {
    const usersCollection = collection(db, "users");
    console.log("id", userId);
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
      {allWorker.map((el, index) => {
        const decodedQuestionForE = el.workExp;
        const truncatedText = decodedQuestionForE.substring(0, 178);
        const isExpanded = index === expandedIndex;

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
            <Link to={`/candidate/${el.userId}`} className={css.nameVac}>
              <h2 className={css.nameVac}>{el.firstName}</h2>
            </Link>
            <p className={css.posadaName}>
              Посада: {el.posada}, Категорія: {el.categoryP}
            </p>
            {el.language.length > 0 && (
              <ul className={css.ulWrapLang}>
                {el.language.map((lan, index) => {
                  return (
                    <li key={index} className={css.liInLan}>
                      {lan.lang}: {lan.level}
                    </li>
                  );
                })}
              </ul>
            )}

            <p className={css.textAbo}>
              {isExpanded ? paragraphs : truncatedText}
              {decodedQuestionForE.length > 178 && (
                <button
                  className={css.buttonAll}
                  onClick={() => handleToggleText(index)}
                >
                  {isExpanded ? "Згорнути" : "Детальніше"}
                </button>
              )}
            </p>
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
        );
      })}
    </section>
  );
};
export default withFirebaseCollection("payment")(AllCandidat);
