import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
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
import { db } from "../../../function/firebase";
const ContactInfoUs = ({ currentUser, userId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
    <section className={css.prodWrap}>
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
        <img src={currentUser.imageUlr} className={css.wrapPictureUs} alt="" />
      </div>
    </section>
  );
};
export default withFirebaseCollection("users")(ContactInfoUs);
