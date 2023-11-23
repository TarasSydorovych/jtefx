import { useEffect, useState } from "react";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import HeaderForHr from "../standartComponent/header/headerForHr";
import css from "./chat.module.css";
import HeaderForRecruit from "../standartComponent/header/headerForRecruit";
import FirstBlockChat from "./firstBlockChat";
const ChatPage = ({ data, role, userId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const foundUser = data.find((user) => user.userId === userId);
    setCurrentUser(foundUser);
  }, [userId, data, role]);
  return (
    <>
      {currentUser && role === "hr" && (
        <HeaderForHr currentUser={currentUser} />
      )}
      {currentUser && role === "worker" && (
        <HeaderForRecruit currentUser={currentUser} />
      )}
      {userId && (
        <section className={css.allChatWrap}>
          <FirstBlockChat userId={userId} />
        </section>
      )}
    </>
  );
};
export default withFirebaseCollection("users")(ChatPage);
