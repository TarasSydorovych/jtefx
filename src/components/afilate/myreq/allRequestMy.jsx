import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import css from "./recruitFhr.module.css";
import { checkRegistration } from "../../../function/authUtils";
import YourVac from "./yourVac";

import HeaderForAfilate from "../../standartComponent/header/headerForAfilate";
import HeaderForBrand from "../../standartComponent/header/headerForBrand";
const AllRequestMy = ({ data }) => {
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  console.log();
  return (
    <>
      {currentUser && currentUser.role === "afilate" && (
        <HeaderForAfilate currentUser={currentUser} />
      )}
      {currentUser && currentUser.role === "brand" && (
        <HeaderForBrand currentUser={currentUser} />
      )}
      <section className={css.wrapRecFrec}>
        <YourVac userId={userId} />
      </section>
    </>
  );
};
export default withFirebaseCollection("users")(AllRequestMy);
