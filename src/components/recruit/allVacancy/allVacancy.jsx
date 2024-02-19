import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "../recruitForHr/recruitFhr.module.css";
import React from "react";
import AllMyVac from "./allMyVac";
import FilteredVa from "./filteredVa";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  doc,
  updateDoc,
  query,
} from "firebase/firestore";
import { db } from "../../../function/firebase";
import HeaderForRecruit from "../../standartComponent/header/headerForRecruit";
const AllVacancy = ({ data, userId }) => {
  const [userVacancies, setUserVacancies] = useState([]);
  const [filteredUserVacancies, setFilteredUserVacancies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
  const [napram, setNapram] = useState("");
  useEffect(() => {
    const fetchProfessionsData = async () => {
      const professionsCollection = collection(db, "users");

      try {
        const querySnapshot = await getDocs(professionsCollection);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const foundUser = data.find((user) => user.userId === userId);

        setCurrentUser(foundUser);
      } catch (error) {
        console.error("Error fetching professions data:", error);
      }
    };

    fetchProfessionsData();
  }, [userId, data]);
  useEffect(() => {
    setUserVacancies(data);
    setFilteredUserVacancies(data);
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
    <>
      {currentUser && <HeaderForRecruit currentUser={currentUser} />}
      <section className={css.wrapRecFrec}>
        <section className={css.yourVacWrap}>
          <h1 className={css.h1YourVac}>Вакансії</h1>
          <div className={css.wrapSmYour}>
            {filteredUserVacancies.length > 0 && (
              <AllMyVac userVacancies={filteredUserVacancies} userId={userId} />
            )}
            {filteredUserVacancies.length === 0 && (
              <h2 className={css.h2YouDonH}>Ще немає доданих вакансії</h2>
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
      </section>
    </>
  );
};
export default withFirebaseCollection("vacancies")(AllVacancy);
