import { Link } from "react-router-dom";
import css from "./recruitFhr.module.css";
import React, { useState } from "react";

const AllMyVac = ({ userVacancies }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleText = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  console.log(userVacancies);
  return (
    <section className={css.myVacWr}>
      {userVacancies &&
        userVacancies.map((el, index) => {
          const decodedQuestionForE = decodeURIComponent(el.achievement);
          const truncatedText = decodedQuestionForE.substring(0, 178);
          const isExpanded = index === expandedIndex;
          if (el.check === true) {
            // Розділити текст за допомогою '\n' і використовувати <br> для переносу рядка
            const paragraphs = decodedQuestionForE
              .split("\n")
              .map((paragraph, idx) => (
                <React.Fragment key={idx}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ));

            return (
              <div key={index} className={css.oneVacWr}>
                <div className={css.oneWr}>
                  <p className={css.pMain}>Вартість ліда: {el.lidPrice}$</p>
                  <p className={css.pMain}>
                    Гео трафіку:{" "}
                    {el.mainCountry &&
                      `${el.mainCountry.theId} (${el.mainCountry.countryId})`}
                    {el.secondCountry &&
                      el.secondCountry.theId &&
                      `, ${el.secondCountry.theId} (${el.secondCountry.countryId})`}
                  </p>
                  <div className={css.wrapBig}>
                    <p className={css.pMain}>CR: {el.cr}%</p>
                    <p className={css.smallp}>
                      Процент лідів які мають закритись з 100
                    </p>
                  </div>
                  <p className={css.pMain}>Funnels: {el.funnels}</p>
                  <div className={css.wrapBig}>
                    <p className={css.pMain}>
                      Traffic Source: {el.traficSource}
                    </p>
                    <p className={css.smallp}>Джерело трафіку</p>
                  </div>
                  <p className={css.pMain}>Коментар: {el.comment}</p>
                </div>
              </div>
            );
          }
        })}
    </section>
  );
};
export default AllMyVac;
