import css from "./chat.module.css";
import { checkRegistration } from "../../function/authUtils";
import ChatUser from "./chatUser";
import { useParams } from "react-router-dom";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import { useEffect, useState } from "react";
import HeaderForHr from "../standartComponent/header/headerForHr";
import HeaderForRecruit from "../standartComponent/header/headerForRecruit";
const Chat = ({ data }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const { id } = useParams();
  let idNumber = parseInt(id, 10);

  const { isRegistered, role, userId } = checkRegistration();
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);
    const foundChatUser = data.find((user) => user.userId === idNumber);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
    setChatUser(foundChatUser);
  }, [data, userId]);

  return (
    <>
      {currentUser && role === "hr" && (
        <HeaderForHr currentUser={currentUser} />
      )}
      {currentUser && role === "worker" && (
        <HeaderForRecruit currentUser={currentUser} />
      )}
      {currentUser && chatUser && isRegistered && (
        <ChatUser
          userId={userId}
          id={id}
          currentUser={currentUser}
          chatUser={chatUser}
        />
      )}
    </>
  );
};
export default withFirebaseCollection("users")(Chat);
