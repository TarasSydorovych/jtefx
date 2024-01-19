import withFirebaseCollection from "../HOK/withFirebaseCollection";
import css from "./admin.module.css";

import { useEffect, useState } from "react";
import { db } from "../../function/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const VacancyUse = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const sortedData = data.slice().sort((a, b) => {
        console.log(b.time - a.time);
        return b.time - a.time;
      });
      setProducts(sortedData);
    }
  }, [data]);

  const handleEditFieldChange = (event, uid, fieldName) => {
    const { value } = event.target;
    const updatedValue =
      fieldName === "questionForE" || fieldName === "achievement"
        ? encodeURIComponent(value)
        : value;
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [uid]: {
        ...prevEditFields[uid],
        [fieldName]: updatedValue,
      },
    }));
  };

  const handleEditClick = (uid) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [uid]: { ...products.find((product) => product.uid === uid) },
    }));
  };

  const handleUpgradeClick = async (uid) => {
    const updatedFields = editFields[uid];

    try {
      await updateDoc(doc(collection(db, "vacancies"), uid), {
        ...updatedFields,
        updatedAt: serverTimestamp(),
      });

      setEditFields((prevEditFields) => {
        delete prevEditFields[uid];
        return { ...prevEditFields };
      });

      // Оновлюємо products з оновленими даними
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.uid === uid ? { ...product, ...updatedFields } : product
        )
      );
    } catch (error) {
      console.error("Помилка оновлення продукту:", error);
    }
  };
  /////////////////////////////////////

  ////////////////////////////////////////
  const handleCheckboxChange = (uid, fieldName) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [uid]: {
        ...prevEditFields[uid],
        [fieldName]: !prevEditFields[uid][fieldName],
      },
    }));
  };
  //////////////////////////////////
  return (
    <div className={css.tableContainer}>
      <h2>Список користувачів</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>ID користувача</th>
            <th>Посада</th>
            <th>Група</th>
            <th>Видимість</th>
            <th>Досягнення</th>
            <th>Про компанію</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.uid}>
              <td>
                <p className={css.psd}>{product.userId}</p>
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].posada}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "posada")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.posada} </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].napram}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "napram")
                    }
                  />
                ) : (
                  <p className={css.psd}>{product.napram}</p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="checkbox"
                    checked={editFields[product.uid].aprovied}
                    onChange={() =>
                      handleCheckboxChange(product.uid, "aprovied")
                    }
                  />
                ) : (
                  <span>{product.aprovied ? "Так" : "Ні"}</span>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <textarea
                    type="text"
                    value={decodeURIComponent(
                      editFields[product.uid]?.achievement || ""
                    )}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "achievement")
                    }
                  />
                ) : (
                  <p className={css.psd}>
                    {decodeURIComponent(product.achievement)}
                  </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <textarea
                    type="text"
                    value={decodeURIComponent(
                      editFields[product.uid].questionForE
                    )}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "questionForE")
                    }
                  />
                ) : (
                  <p className={css.psd}>
                    {decodeURIComponent(product.questionForE)}
                  </p>
                )}
              </td>

              {/*   <td>
                {editFields[product.userId] ? (
                  <input
                    type="text"
                    value={editFields[product.userId].varning}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.userId, "varning")
                    }
                  />
                ) : (
                  product.varning
                )}
              </td>*/}

              <td>
                {editFields[product.uid] ? (
                  <button onClick={() => handleUpgradeClick(product.uid)}>
                    Зберегти
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(product.uid)}>
                    Редагувати
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default withFirebaseCollection("vacancies")(VacancyUse);
