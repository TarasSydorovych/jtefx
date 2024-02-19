import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import React from "react";
import AllMyVac from "./allMyVac";
import FilteredVa from "./filteredVa";

const YourVac = ({ data, userId }) => {
  const [userVacancies, setUserVacancies] = useState([]);
  const [filteredUserVacancies, setFilteredUserVacancies] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [countryListTwo, setCountryListTwo] = useState([]);
  const [search, setSearch] = useState("");
  const [napram, setNapram] = useState("");
  const [napramTwo, setNapramTwo] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    // Фільтрація об'єктів за умовою data[i].userId === userId

    // Збереження відфільтрованих об'єктів у стані
    setUserVacancies(data);
    setFilteredUserVacancies(data);
  }, [data, userId]);
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    filterVacancies(searchTerm, napram, "");
  };
  const handleNapramChange = (e) => {
    const selectedNapram = e.target.value;

    setNapram(selectedNapram);
    filterVacancies(search, selectedNapram, napramTwo);
  };
  const handleNapramChangeTwo = (e) => {
    const selectedNapramTwo = e.target.value;

    setNapramTwo(selectedNapramTwo);
    filterVacancies(search, napram, selectedNapramTwo);
  };
  const handleMinPriceChange = (e) => {
    const selectedNapramTwo = e.target.value;

    setMinPrice(selectedNapramTwo);
    filterVacancies(search, napram, napramTwo, selectedNapramTwo, maxPrice);
  };

  const handleMaxPriceChange = (e) => {
    const selectedNapramTwo = e.target.value;
    setMaxPrice(selectedNapramTwo);
    filterVacancies(search, napram, napramTwo, minPrice, selectedNapramTwo);
  };
  // const filterVacancies = (searchTerm, selectedNapram, selectedNapramTwo) => {
  //   let filteredVacancies = userVacancies;
  //   console.log(searchTerm);
  //   if (searchTerm) {
  //     // Фільтрація за пошуковим терміном у назві вакансії
  //     filteredVacancies = filteredVacancies.filter((vacancy) =>
  //       vacancy.mainCountry.countryId
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (selectedNapram) {
  //     console.log("selectedNapram", selectedNapram);
  //     filteredVacancies = filteredVacancies.filter(
  //       (vacancy) => vacancy.mainCountry.countryId === selectedNapram
  //     );
  //   }
  //   if (selectedNapramTwo) {
  //     console.log("selectedNapramTwo", selectedNapramTwo);
  //     filteredVacancies = filteredVacancies.filter(
  //       (vacancy) => vacancy.secondCountry.countryId === selectedNapramTwo
  //     );
  //   }

  //   // Оновлення стану з фільтрованими вакансіями
  //   setFilteredUserVacancies(filteredVacancies);
  // };
  const filterVacancies = (
    searchTerm,
    selectedNapram,
    selectedNapramTwo,
    minPrice,
    maxPrice
  ) => {
    let filteredVacancies = userVacancies;

    if (searchTerm) {
      filteredVacancies = filteredVacancies.filter((vacancy) =>
        vacancy.mainCountry.countryId
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNapram) {
      filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.mainCountry.countryId === selectedNapram
      );
    }

    if (selectedNapramTwo) {
      filteredVacancies = filteredVacancies.filter(
        (vacancy) => vacancy.secondCountry.countryId === selectedNapramTwo
      );
    }

    if (minPrice && maxPrice) {
      filteredVacancies = filteredVacancies.filter(
        (vacancy) =>
          vacancy.lidPrice >= parseInt(minPrice) &&
          vacancy.lidPrice <= parseInt(maxPrice)
      );
    }

    setFilteredUserVacancies(filteredVacancies);
  };
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
          <AllMyVac userVacancies={filteredUserVacancies} userId={userId} />
        )}
        {filteredUserVacancies.length === 0 && (
          <h2 className={css.h2YouDonH}>У Вас ще немає доданих заявок</h2>
        )}
        <FilteredVa
          setCountryList={setCountryList}
          setCountryListTwo={setCountryListTwo}
          countryList={countryList}
          countryListTwo={countryListTwo}
          handleSearchChange={handleSearchChange}
          handleNapramChange={handleNapramChange}
          setSearch={setSearch}
          search={search}
          setNapram={setNapram}
          handleNapramChangeTwo={handleNapramChangeTwo}
          napram={napram}
          napramTwo={napramTwo}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleMinPriceChange={handleMinPriceChange}
          handleMaxPriceChange={handleMaxPriceChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </section>
  );
};
export default withFirebaseCollection("trafic")(YourVac);
