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
const FirstBlockChat = ({ userId }) => {
  const [userChats, setUserChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const [allMessages, setAllMessages] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "messages")).then((querySnapshot) => {
      console.log(querySnapshot);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(newData);
      console.log(messages, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // Викликати функцію отримання даних

  return (
    <section className={css.firstBlockWrap}>
      <button onClick={fetchPost}>dsadfasdfasd</button>
    </section>
  );
};
export default FirstBlockChat;
