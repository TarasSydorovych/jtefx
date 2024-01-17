import { useEffect, useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
const FilteredVa = ({
  data,
  handleSearchChange,
  handleNapramChange,
  setSearch,
  search,
  setNapram,
  napram,
  setCountryList,
  setCountryListTwo,
  countryListTwo,
  countryList,
  napramTwo,
  handleNapramChangeTwo,
  setMaxPrice,
  setMinPrice,
  handleMaxPriceChange,
  handleMinPriceChange,
  minPrice,
  maxPrice,
}) => {
  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });
    GetCountries().then((result) => {
      setCountryListTwo(result);
    });
  }, []);

  return (
    <section className={css.filterWrap}>
      <p className={css.seacchP}>Шукати за ціною</p>
      <div className={css.priceRange}>
        <input
          className={css.inputPrice}
          placeholder="Від"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          className={css.inputPrice}
          placeholder="До"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>

      <p className={css.seacchP}>Шукайте за основним гео</p>
      <select
        className={css.inputStSelectNew}
        value={napram}
        onChange={handleNapramChange}
      >
        <option disabled value="">
          -- Оберіть країну --
        </option>
        {countryList.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <p className={css.seacchP}>Шукайте за другорядним гео</p>
      <select
        className={css.inputStSelectNew}
        value={napramTwo}
        onChange={handleNapramChangeTwo}
      >
        <option disabled value="">
          -- Оберіть країну --
        </option>
        {countryList.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </section>
  );
};
export default withFirebaseCollection("professions")(FilteredVa);
