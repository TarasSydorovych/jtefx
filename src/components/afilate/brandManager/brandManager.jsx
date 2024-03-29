import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import css from "./recruitFhr.module.css";
import { checkRegistration } from "../../../function/authUtils";
import YourVac from "./yourVac";
import HeaderForBrand from "../../standartComponent/header/headerForBrand";
const BrandManager = ({ data }) => {
  const { firstName, userId } = checkRegistration();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Знаходимо користувача за userId
    const foundUser = data.find((user) => user.userId === userId);

    // Зберігаємо користувача в стейт
    setCurrentUser(foundUser);
  }, [data, userId]);
  return (
    <>
      {currentUser && <HeaderForBrand currentUser={currentUser} />}

      <section className={css.wrapRecFrec}>
        <YourVac userId={userId} />
      </section>
    </>
  );
};
export default withFirebaseCollection("users")(BrandManager);
