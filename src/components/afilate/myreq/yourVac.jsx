import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import React from "react";
import AllMyVac from "./allMyVac";

const YourVac = ({ data, userId }) => {
  const [userVacancies, setUserVacancies] = useState([]);
  const [filteredUserVacancies, setFilteredUserVacancies] = useState([]);

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    // Фільтрація об'єктів за умовою data[i].userId === userId

    // Збереження відфільтрованих об'єктів у стані
    setUserVacancies(data);
    setFilteredUserVacancies(data);
  }, [data, userId]);

  const sortUserVacancies = (type, order) => {
    let sortedVacancies = [...filteredUserVacancies];

    if (type === "date") {
      sortedVacancies.sort((a, b) => {
        const dateA = a.date.seconds;
        const dateB = b.date.seconds;
        return dateB - dateA;
      });
    } else if (type === "asc") {
      sortedVacancies.sort((a, b) => {
        const priceA = a.lidPrice;
        const priceB = b.lidPrice;
        return priceA - priceB;
      });
    } else if (type === "desc") {
      sortedVacancies.sort((a, b) => {
        const priceA = a.lidPrice;
        const priceB = b.lidPrice;
        return priceB - priceA;
      });
    }

    setFilteredUserVacancies(sortedVacancies);
  };
  const handleSortChange = (type) => {
    console.log("type", type);

    if (type === "date") {
      setSortBy(type);
      setSortOrder("date"); // Спочатку новіші
    } else if (type === "asc") {
      setSortBy(type);
      setSortOrder("asc");
    } else if (type === "desc") {
      setSortBy(type);
      setSortOrder("desc");
    }
    sortUserVacancies(type, sortOrder);
  };
  return (
    <section className={css.yourVacWrap}>
      <h1 className={css.h1YourVac}>Заявки</h1>
      <div className={css.sortFotDiv}>
        <label className={css.fortFor} htmlFor="sortSelect">
          Сортувати за:
        </label>
        <select
          id="sortSelect"
          className={css.priceInpD}
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option disabled value="">
            Сортувати за
          </option>
          <option value="date">Датою</option>

          <option value="asc">Від найдешевшої ціни</option>
          <option value="desc">Від найдорожчої ціни</option>
        </select>
      </div>
      <div className={css.wrapSmYour}>
        {filteredUserVacancies.length > 0 && (
          <AllMyVac userVacancies={filteredUserVacancies} />
        )}
        {filteredUserVacancies.length === 0 && (
          <h2 className={css.h2YouDonH}>У Вас ще немає доданих заявок</h2>
        )}
      </div>
    </section>
  );
};
export default withFirebaseCollection("request")(YourVac);
