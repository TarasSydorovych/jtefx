import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { isEmpty } from "lodash";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AiFillFile } from "react-icons/ai";
import { db } from "../../function/firebase";
import css from "./chat.module.css";
const ChatUser = ({ userId, id, currentUser, chatUser }) => {
  const storage = getStorage();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const scrollRef = useRef(null);
  // Функція для аналізу тексту та виявлення телефонних номерів
  const findPhoneNumbers = (text) => {
    const phoneRegex = /\b\d{10}\b|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
    const matches = text.match(phoneRegex);
    return matches || [];
  };

  // Функція для аналізу тексту та виявлення електронних адрес
  const findEmails = (text) => {
    const emailRegex = /\S+@\S+\.\S+/g;
    const matches = text.match(emailRegex);
    return matches || [];
  };

  // Функція для аналізу тексту та виявлення ключових слів
  const findKeywords = (text, keywords) => {
    const lowercasedText = text.toLowerCase();
    return keywords.filter((keyword) => lowercasedText.includes(keyword));
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = [userId, id].sort().join("_");
      const messagesCollectionRef = collection(
        db,
        `messages/${chatId}/messages`
      );
      const q = query(messagesCollectionRef, orderBy("createdAt"), limit(50));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        console.log(querySnapshot);
        setMessages(fetchedMessages);
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      });

      return unsubscribe;
    };

    if (userId) {
      fetchMessages();
    }
  }, [id, userId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const chatId = [userId, id].sort().join("_");
    const chatRoomQuery = query(
      collection(db, "chatRoom"),
      where("chatId", "==", chatId)
    );
    const chatRoomQuerySnapshot = await getDocs(chatRoomQuery);

    if (isEmpty(chatRoomQuerySnapshot.docs)) {
      // Якщо документ не існує, то додайте його до колекції
      await addDoc(collection(db, "chatRoom"), { userId, id, chatId });
    }
    // Аналіз тексту перед відправкою
    const phoneNumbers = findPhoneNumbers(message);
    const emails = findEmails(message);
    const keywords = findKeywords(message, [
      "телеграм",
      "тг",
      "tg",
      "telegram",
    ]);

    if (phoneNumbers.length > 0 || emails.length > 0 || keywords.length > 0) {
      // Виявлено контактні дані або ключові слова, реагувати за власним вибором
      alert(
        "Попередження: Ви використовуєте контактні дані або ключові слова."
      );

      try {
        // Отримайте посилання на користувача
        const usersCollectionRef = collection(db, "users");
        const userQuery = query(
          usersCollectionRef,
          where("userId", "==", userId)
        );
        const userQuerySnapshot = await getDocs(userQuery);

        if (!isEmpty(userQuerySnapshot.docs)) {
          const userDocRef = userQuerySnapshot.docs[0].ref;

          // Оновіть поле varning користувача
          const newWarning = {
            toRecive: id,
            recipientId: userId,
            chatId: chatId,
          };

          await updateDoc(userDocRef, {
            varning: [...userQuerySnapshot.docs[0].data().varning, newWarning],
          });
        } else {
          // Якщо користувача не знайдено, ви можете вирішити, чи створити його
          console.warn("Користувач не знайдений");
        }
      } catch (error) {
        console.error("Error updating user document:", error);
      }
    }

    // Надсилання повідомлення
    try {
      const messagesCollectionRef = collection(
        db,
        `messages/${chatId}/messages`
      );
      await addDoc(messagesCollectionRef, {
        uid: id,
        recipientId: userId,
        message,
        createdAt: new Date().toISOString(),
        check: "false",
      });
      setMessage("");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={css.wrapChat}>
      <div className={css.wrapChatSmall}>
        <h2 className={css.h2Chat}>Чат з користувачем: {chatUser.firstName}</h2>
        <p className={css.desckWarning}>
          Просимо зауважити, що передача персональних контактів в обхід
          платформи відслідковується. При порушені правил ви будете заблоковані
          без можливості повернення коштів
        </p>
        <div className={css.chatWindovWrap}>
          {messages.map((msg) => {
            let name;
            let messageStyle, messageStyleSmal;

            const uid = parseInt(msg.uid, 10);
            if (uid === currentUser.userId) {
              name = chatUser.firstName;
              messageStyle = css.myMessage; // Додайте клас для повідомлення від поточного користувача
              messageStyleSmal = css.notMymes;
            } else if (uid === chatUser.userId) {
              name = currentUser.firstName;
              messageStyle = css.otherUserMessage; // Додайте клас для повідомлення від іншого користувача
              messageStyleSmal = css.myMymes;
            }

            return (
              <div className={`${css.masWrap} ${messageStyle}`} key={msg.id}>
                <strong className={css.outhNameMes}>{name}:</strong>{" "}
                <div className={`${css.wrapMesMes} ${messageStyleSmal}`}>
                  <p className={css.pMes}>{msg.message}</p>
                  <p className={css.pTime}>({msg.createdAt})</p>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>
        <div className={css.formWrap}>
          <form className={css.theForm} onSubmit={sendMessage}>
            <textarea
              className={css.formInput}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Напишіть ваше повідомлення..."
            />
            <button className={css.buttonSub} type="submit">
              Надіслати
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
