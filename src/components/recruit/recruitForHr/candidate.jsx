import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import { checkRegistration } from "../../../function/authUtils";
import { useEffect, useState } from "react";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import SmallCandidat from "./smallCandidat";
const Candidate = ({ data }) => {
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);
  const [allWorker, setAllWorker] = useState("");
  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);
    const workers = data.filter((user) => user.role === "worker");
    setAllWorker(workers);
    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  return (
    <>
      {currentUser && <HeaderForHr currentUser={currentUser} />}
      <section className={css.wrapRecFrec}>
        <SmallCandidat allWorker={allWorker} data={data} />
      </section>
    </>
  );
};
export default withFirebaseCollection("users")(Candidate);
