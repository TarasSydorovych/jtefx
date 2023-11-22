import { useState } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import css from "./recruitFhr.module.css";
const FilteredVa = ({
  data,
  handleSearchChange,
  handleNapramChange,
  setSearch,
  search,
  setNapram,
  napram,
}) => {
  return (
    <section className={css.filterWrap}>
      <p className={css.seacchP}>Шукати за посадою</p>
      <input
        className={css.inputVacName}
        value={search}
        onChange={handleSearchChange}
      />
      <p className={css.seacchP}>Шукайте за категорією</p>
      <select
        className={css.inputStSelectNew}
        value={napram}
        onChange={handleNapramChange}
      >
        <option disabled value="">
          -- Оберіть категорію --
        </option>
        {data.map((el, index) => (
          <optgroup key={index} label={el.name.nameProf}>
            {el.name.fullProf.map((prof, indexO) => (
              <option key={indexO} value={prof}>
                {prof}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </section>
  );
};
export default withFirebaseCollection("professions")(FilteredVa);
