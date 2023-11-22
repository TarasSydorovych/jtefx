import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import React from "react";
import AllMyVac from "./allMyVac";
import FilteredVa from "./filteredVa";

const YourVac = ({ data, userId }) => {
  const [userVacancies, setUserVacancies] = useState([]);
  const [filteredUserVacancies, setFilteredUserVacancies] = useState([]);

  const [search, setSearch] = useState("");
  const [napram, setNapram] = useState("");
  useEffect(() => {
    // Фільтрація об'єктів за умовою data[i].userId === userId
    const filteredVacancies = data.filter((item) => item.userId === userId);

    // Збереження відфільтрованих об'єктів у стані
    setUserVacancies(filteredVacancies);
    setFilteredUserVacancies(filteredVacancies);
  }, [data, userId]);
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    filterVacancies(searchTerm, napram);
  };
  const handleNapramChange = (e) => {
    const selectedNapram = e.target.value;
    setNapram(selectedNapram);
    filterVacancies(search, selectedNapram);
  };
  const filterVacancies = (searchTerm, selectedNapram) => {
    let filteredVacancies = userVacancies;

    if (searchTerm) {
      // Фільтрація за пошуковим терміном у назві вакансії
      filteredVacancies = filteredVacancies.filter((vacancy) =>
        vacancy.posada.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNapram) {
      // Фільтрація за обраною категорією
      filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.napram === selectedNapram
      );
    }

    // Оновлення стану з фільтрованими вакансіями
    setFilteredUserVacancies(filteredVacancies);
  };
  return (
    <section className={css.yourVacWrap}>
      <h1 className={css.h1YourVac}>Ваші вакансії</h1>
      <div className={css.wrapSmYour}>
        {filteredUserVacancies.length > 0 && (
          <AllMyVac userVacancies={filteredUserVacancies} />
        )}
        {filteredUserVacancies.length === 0 && (
          <h2 className={css.h2YouDonH}>У Вас ще немає доданих вакансії</h2>
        )}
        <FilteredVa
          handleSearchChange={handleSearchChange}
          handleNapramChange={handleNapramChange}
          setSearch={setSearch}
          search={search}
          setNapram={setNapram}
          napram={napram}
        />
      </div>
    </section>
  );
};
export default withFirebaseCollection("vacancies")(YourVac);
