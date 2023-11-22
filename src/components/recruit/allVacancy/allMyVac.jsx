import { Link } from "react-router-dom";
import css from "../recruitForHr/recruitFhr.module.css";
import React, { useState } from "react";

const AllMyVac = ({ userVacancies }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleText = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <section className={css.myVacWr}>
      {userVacancies.map((el, index) => {
        const decodedQuestionForE = decodeURIComponent(el.achievement);
        const truncatedText = decodedQuestionForE.substring(0, 178);
        const isExpanded = index === expandedIndex;

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
            <Link to={`/vacancy/${el.uid}`} className={css.nameVac}>
              <h2 className={css.nameVac}>{el.posada}</h2>
            </Link>
            <p className={css.otherInfo}>
              <span className={css.span}> {el.country.countryId}</span>
              <span className={css.span}>{el.isChecked1 && "Тільки офіс"}</span>
              <span className={css.span}>
                {el.isChecked2 && "Може виїхати за потреби"}
              </span>
              <span className={css.span}>
                {el.isChecked3 && "Тільки віддалено"}
              </span>
              <span className={css.span}>{`${el.exp} досвіду`}</span>
            </p>

            <p className={css.textAbo}>
              {isExpanded ? paragraphs : truncatedText}
              {decodedQuestionForE.length > 178 && (
                <button
                  className={css.buttonAll}
                  onClick={() => handleToggleText(index)}
                >
                  {isExpanded ? "Згорнути" : "Детальніше"}
                </button>
              )}
            </p>
          </div>
        );
      })}
    </section>
  );
};
export default AllMyVac;
