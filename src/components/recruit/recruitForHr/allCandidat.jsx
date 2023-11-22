import { Link } from "react-router-dom";
import css from "./recruitFhr.module.css";
import React, { useState } from "react";

const AllCandidat = ({ allWorker }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleText = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <section className={css.myVacWr}>
      {allWorker.map((el, index) => {
        const decodedQuestionForE = el.workExp;
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
            <Link to={`/candidate/${el.userId}`} className={css.nameVac}>
              <h2 className={css.nameVac}>{el.firstName}</h2>
            </Link>
            <p className={css.posadaName}>
              Посада: {el.posada}, Категорія: {el.categoryP}
            </p>
            {el.language.length > 0 && (
              <ul className={css.ulWrapLang}>
                {el.language.map((lan, index) => {
                  return (
                    <li key={index} className={css.liInLan}>
                      {lan.lang}: {lan.level}
                    </li>
                  );
                })}
              </ul>
            )}

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
export default AllCandidat;
