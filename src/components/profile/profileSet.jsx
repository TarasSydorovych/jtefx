import { useEffect, useState } from "react";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import css from "./recruitFrec.module.css";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../../function/firebase";
import { checkRegistration } from "../../function/authUtils";
import HeaderForAfilate from "../standartComponent/header/headerForAfilate";
import HeaderForBrand from "../standartComponent/header/headerForBrand";
import HeaderForHr from "../standartComponent/header/headerForHr";
const ProfileSet = ({ data }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.firstName);
      setPhone(currentUser.phone);
      setEmail(currentUser.mail);
    }
  }, [currentUser]);
  const updateUserDataInFirebase = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("userId", "==", userId)); // Оновлено виклик query

      const userDocs = await getDocs(q);

      if (!userDocs.empty) {
        // Знайдено користувача, оновіть його дані
        const userDocRef = doc(db, "users", userDocs.docs[0].id);
        await updateDoc(userDocRef, {
          firstName: name,
          mail: email,
          phone: phone,
        });
        alert("Зміни успішно додані");
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error("Помилка при оновленні даних користувача:", error);
    }
  };
  return (
    <>
      {currentUser && currentUser.role === "afilate" && (
        <HeaderForAfilate currentUser={currentUser} />
      )}
      {currentUser && currentUser.role === "brand" && (
        <HeaderForBrand currentUser={currentUser} />
      )}
      {currentUser && currentUser.role === "hr" && (
        <HeaderForHr currentUser={currentUser} />
      )}
      {currentUser && (
        <section className={css.prodWrap}>
          <p className={css.contactP}>Ваші контактні дані</p>
          <div className={css.smWrL}>
            <div className={css.firstWrap}>
              <div className={css.wrapSec}>
                <p className={css.pPosada}>Імʼя та прізвище</p>
                <input
                  className={css.inputSt}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={css.wrapSec}>
                <p className={css.pPosada}>Телефон</p>
                <input
                  className={css.inputSt}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={css.wrapSec}>
                <p className={css.pPosada}>Email</p>
                <input
                  className={css.inputSt}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={css.wrapSec}>
                <p className={css.pPosada}>Telegram</p>
                <p className={css.pForTg}>{currentUser.username}</p>
              </div>
              <button onClick={updateUserDataInFirebase} className={css.save}>
                Зберегти
              </button>
            </div>
            <div className={css.secondWrap}>
              <img
                src={currentUser.imageUlr}
                className={css.wrapPictureUs}
                alt=""
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default withFirebaseCollection("users")(ProfileSet);
