import css from "./vacancy.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, React } from "react";
import withFirebaseCollection from "../../HOK/withFirebaseCollection";
import { checkRegistration } from "../../../function/authUtils";
import HeaderForHr from "../../standartComponent/header/headerForHr";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../function/firebase";
import { Fragment } from "react";
import { BiCheckCircle } from "react-icons/bi";
import HeaderForRecruit from "../../standartComponent/header/headerForRecruit";

const Vacancy = ({ data }) => {
  const [vacancyData, setVacancyData] = useState(null);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const { isRegistered, role, userId } = checkRegistration();

  useEffect(() => {
    const fetchProfessionsData = async () => {
      const professionsCollection = collection(db, "users");

      try {
        const querySnapshot = await getDocs(professionsCollection);
        const dataUse = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const foundUser = dataUse.find((user) => user.userId === userId);

        setCurrentUser(foundUser);
      } catch (error) {
        console.error("Error fetching professions data:", error);
      }
    };

    fetchProfessionsData();
  }, [userId, id]);

  useEffect(() => {
    // Знаходимо користувача в масиві за його id
    const vacancy = data.find((user) => user.uid === id);

    // Якщо знайдено, встановлюємо дані в стан
    if (vacancy) {
      setVacancyData(vacancy);
    }
  }, [data, id]);

  let decodedQuestionForE, paragraphs, decodedQuestionForDesc, paragraphsTwo;
  if (vacancyData) {
    decodedQuestionForDesc = decodeURIComponent(vacancyData.questionForE);
    decodedQuestionForE = decodeURIComponent(vacancyData.achievement);
    paragraphs = decodedQuestionForE.split("\n").map((paragraph, idx) => (
      <Fragment key={idx}>
        {" "}
        {/* Використовуємо Fragment */}
        {paragraph}
        <br />
      </Fragment>
    ));
    paragraphsTwo = decodedQuestionForDesc.split("\n").map((paragraph, idx) => (
      <Fragment key={idx}>
        {" "}
        {/* Використовуємо Fragment */}
        {paragraph}
        <br />
      </Fragment>
    ));
  }

  return (
    <>
      {currentUser && role === "hr" && (
        <HeaderForHr currentUser={currentUser} />
      )}
      {currentUser && role === "worker" && (
        <HeaderForRecruit currentUser={currentUser} />
      )}
      {vacancyData && (
        <section className={css.vaconcyWrapAll}>
          <div className={css.vacancyWrSmall}>
            <h1 className={css.h1Vacancy}>{vacancyData.posada}</h1>
            <div className={css.vacSmalW}>
              <div className={css.descVacW}>
                <p className={css.aboutVacan}>{paragraphs}</p>
                <p className={css.descP}>Про компанію</p>
                <p className={css.aboutVacan}>{paragraphsTwo}</p>
              </div>
              <div className={css.wrapWithButton}>
                <div className={css.smallDescW}>
                  <p className={css.standartForP}>
                    <BiCheckCircle className={css.biCheckCircle} />
                    Досвід: {vacancyData.exp}
                  </p>
                  <p className={css.standartForP}>
                    <BiCheckCircle className={css.biCheckCircle} />
                    Категорія: {vacancyData.napram}
                  </p>
                </div>
                {role !== "hr" && (
                  <button className={css.sendMycont}>
                    Відгукнутись на вакансію
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default withFirebaseCollection("vacancies")(Vacancy);
