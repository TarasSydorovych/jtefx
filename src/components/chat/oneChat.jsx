import { Link } from "react-router-dom";
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
import { useEffect, useState } from "react";
const OneChat = ({ el, data, userId }) => {
  const [targetUser, setTargetUser] = useState(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const user = data.find((user) => user.userId === parseInt(el.forHo, 10));

    if (user) {
      const messagesRef = collection(db, `messages/${el.chatId}/messages`);
      const userIdAsString1 = String(userId);
      console.log(userIdAsString1);
      const q = query(
        messagesRef,
        where("check", "==", "false"),
        where("uid", "==", userIdAsString1)
      );
      getDocs(q)
        .then((querySnapshot) => {
          const count = querySnapshot.size;
          setUnreadMessagesCount(count);
        })
        .catch((error) => {
          console.error("Error getting unread messages:", error);
        });
    }
    // Отримали дані про користувача, тепер записуємо їх у стан
    setTargetUser(user);
  }, [data, el.forHo]);

  return (
    <>
      {el && el.forHo && targetUser && (
        <div className={css.chatOne}>
          <Link to={`/chat/${el.forHo}`} className={css.linka}>
            <div className={css.userInformation}>
              <p className={css.xfn}>
                Чат з {targetUser.role === "worker" && "кандидатом"}
                {targetUser.role === "hr" && "рекрутером"}
                {targetUser.role === "brand" && "Brand Manager"}
                {targetUser.role === "afilate" && "Affiliate manager"}&nbsp;
              </p>

              <p className={css.userName}>{targetUser.firstName}</p>
              {targetUser.imageUlr.length < 0 && (
                <div className={css.iconWrap}></div>
              )}
              {targetUser.imageUlr.length > 0 && (
                <div className={css.iconWrapPhoto}>
                  <img src={targetUser.imageUlr} className={css.picForChat} />
                </div>
              )}
            </div>
          </Link>
          <p className={css.newMessage}>
            У Вас {unreadMessagesCount} нових повідомлень
          </p>
        </div>
      )}
    </>
  );
};
export default withFirebaseCollection("users")(OneChat);
