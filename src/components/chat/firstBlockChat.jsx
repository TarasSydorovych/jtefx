import { useEffect, useState } from "react";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import css from "./chat.module.css";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../function/firebase";
import { Link } from "react-router-dom";
import OneChat from "./oneChat";
import { PiClockAfternoon } from "react-icons/pi";
const FirstBlockChat = ({ userId, data }) => {
  const [userChats, setUserChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const currentDate = new Date();
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    // Фільтруємо чати, які містять userId в chatId
    const filteredChats = data.filter((item) => item.chatId.includes(userId));

    // Зберігаємо відфільтровані чати у стані
    setUserChats(
      filteredChats.map((chat) => ({
        ...chat,
        forHo: chat.chatId
          .replace(userId.toString(), "") // видаляємо userId з chatId
          .replace("_", ""), // видаляємо знак _ з chatId
      }))
    );
  }, [data, userId]);

  return (
    <section className={css.firstBlockWrap}>
      <div className={css.smalWrC}>
        <p className={css.chatRoomP}>Ваші чати</p>
        {userChats.length === 0 && (
          <p className={css.xfn}>У Вас ще немає чатів</p>
        )}
        {userChats &&
          userChats.map((el, index) => {
            return <OneChat userId={userId} key={index} el={el} />;
          })}
      </div>
    </section>
  );
};
export default withFirebaseCollection("chatRoom")(FirstBlockChat);
