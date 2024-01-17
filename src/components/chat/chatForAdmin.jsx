import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useLocation, useParams } from "react-router-dom";
const ChatForAdmin = ({ userId }) => {
  const { id } = useParams();
  const location = useLocation();

  const storage = getStorage();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [chatUserId, setChatUserId] = useState(null);
  const scrollRef = useRef(null);
  // Функція для аналізу тексту та виявлення телефонних номерів

  const scrollToBottom = () => {
    if (scrollRef.current) {
      let hiddenElement = document.getElementById("box");

      hiddenElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const parts = id.split(/[_]/);
    const cleanedValue = location.search.substring(1);
    const filteredParts = parts.filter((part) => part !== cleanedValue);

    setChatUserId(filteredParts[0]);
    setCurrentUserId(cleanedValue);
  }, [id]);
  /////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId && chatUserId) {
        const newMain = parseInt(currentUserId, 10);
        const userQuery1 = query(
          collection(db, "users"),
          where("userId", "==", newMain)
        );
        const newNotMain = parseInt(chatUserId, 10);
        const userQuery2 = query(
          collection(db, "users"),
          where("userId", "==", newNotMain)
        );

        const userSnapshot1 = await getDocs(userQuery1);
        const userSnapshot2 = await getDocs(userQuery2);

        if (!isEmpty(userSnapshot1.docs)) {
          setCurrentUser(userSnapshot1.docs[0].data());
        }

        if (!isEmpty(userSnapshot2.docs)) {
          setChatUser(userSnapshot2.docs[0].data());
        }
      }
    };

    fetchData();
  }, [currentUserId, chatUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = [userId, id].sort().join("_");
      const messagesCollectionRef = collection(db, `messages/${id}/messages`);
      const q = query(messagesCollectionRef, orderBy("createdAt"), limit(50));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });

        setMessages(fetchedMessages);
      });

      return unsubscribe;
    };

    if (id) {
      fetchMessages();
    }
  }, [id, userId]);
  useEffect(() => {
    setTimeout(() => scrollToBottom(), 0);
  }, [messages]);

  return (
    <div className={css.wrapChat}>
      {currentUser && chatUser && (
        <div className={css.wrapChatSmall}>
          <h2 className={css.h2Chat}>
            Чат користувачів: {chatUser.firstName} та {currentUser.firstName}
          </h2>

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
            <div id="box" ref={scrollRef}></div>
          </div>
          {/* 
          <div className={css.formWrap}>
            <form className={css.theForm}>
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
          */}
        </div>
      )}
    </div>
  );
};

export default ChatForAdmin;
