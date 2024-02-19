import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import React from "react";
import AllMyVac from "./allMyVac";
import FilteredVa from "./filteredVa";
import AllCandidat from "./allCandidat";
import { checkRegistration } from "../../../function/authUtils";
import SearchCandidat from "./searchCandidat";
const SmallCandidat = ({ data, allWorker }) => {
  const [userVacancies, setUserVacancies] = useState([]);
  const { firstName, userId } = checkRegistration();
  const [filteredUserVacancies, setFilteredUserVacancies] = useState([]);
  const [search, setSearch] = useState("");
  const [napram, setNapram] = useState("");
  useEffect(() => {
    // Збереження відфільтрованих об'єктів у стані
    setUserVacancies(allWorker);
    setFilteredUserVacancies(allWorker);
  }, [allWorker]);
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
        vacancy.firstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNapram) {
      // Фільтрація за обраною категорією
      filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.categoryP === selectedNapram
      );
    }

    // Оновлення стану з фільтрованими вакансіями
    setFilteredUserVacancies(filteredVacancies);
  };
  return (
    <section className={css.yourVacWrap}>
      <h1 className={css.h1YourVac}>Всі кандитати</h1>
      <div className={css.wrapSmYour}>
        {filteredUserVacancies.length > 0 && filteredUserVacancies && (
          <AllCandidat allWorker={filteredUserVacancies} userId={userId} />
        )}
        {filteredUserVacancies.length === 0 && (
          <h2 className={css.h2YouDonH}>Кандитатів ще немає</h2>
        )}
        <SearchCandidat
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
export default SmallCandidat;
