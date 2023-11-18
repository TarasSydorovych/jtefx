import { useParams } from "react-router-dom";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import { useEffect, useState } from "react";
import HeaderForRecruit from "../standartComponent/header/headerForRecruit";
import css from "./workerPage.module.css";
import { FaEarthAsia } from "react-icons/fa6";
import { PiLightningFill } from "react-icons/pi";
import { FaLanguage } from "react-icons/fa";

const WorkerPage = ({ data }) => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const numericId = parseInt(id, 10);
  useEffect(() => {
    // Знаходимо користувача в масиві за його id
    const user = data.find((user) => user.userId === numericId);
    console.log(user);
    // Якщо знайдено, встановлюємо дані в стан
    if (user) {
      setUserData(user);
    }
  }, [data, id]);
  return (
    <>
      {userData && <HeaderForRecruit currentUser={userData} />}
      {userData && (
        <section className={css.anketaWrap}>
          <div className={css.smallWrap}>
            <div className={css.anotherWrap}>
              <h1 className={css.mainVac}>{userData.posada}</h1>
              <p className={css.descGre}>
                Так виглядає Ваш публічний профіль на{" "}
                <span className={css.descGreSpan}>JTEfx</span>
              </p>
              <p className={css.allPdesc}>Досвід</p>
              <p className={css.pAllDesc}>{userData.workExp}</p>
              <p className={css.allPdesc}>Досягнення</p>
              <p className={css.pAllDesc}>{userData.achievement}</p>
              <p className={css.allPdesc}>Мови спідкування</p>
              <ul className={css.languageUl}>
                {userData.language.map((el, index) => {
                  return (
                    <li className={css.languageLi} key={index}>
                      {el.lang}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={css.wrapSmExp}>
              <p className={css.firstPVal}>${userData.paymantRel}/місяць</p>
              <div className={css.restInfoWrap}>
                <p className={css.informTr}>
                  <FaEarthAsia className={css.faEarthAsia} />
                  {userData.country.countryId}, {userData.city}
                </p>
                <p className={css.informTr}>
                  <PiLightningFill className={css.faEarthAsia} />
                  {userData.experience}
                </p>
                <p className={css.informTrd}>
                  <FaLanguage className={css.faEarthAsia} />
                  <div className={css.informTrLand}>
                    {userData.language.map((el, index) => {
                      return <div key={index}>{el.lang}</div>;
                    })}
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default withFirebaseCollection("users")(WorkerPage);
