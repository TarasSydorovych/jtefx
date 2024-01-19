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

const AfilateUseAdm = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      const sortedData = data.slice().sort((a, b) => {
        return b.date - a.date;
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
      await updateDoc(doc(collection(db, "request"), uid), {
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
            <th>Ціна ліда</th>
            <th>Основне гео</th>
            <th>Видимість</th>
            <th>Cr</th>
            <th>Funnels</th>
            <th>Traffic Source</th>
            <th>Коментар</th>
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
                    value={editFields[product.uid].lidPrice}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "lidPrice")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.lidPrice} </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].mainCountry.countryId}
                    onChange={(e) =>
                      handleEditFieldChange(
                        e,
                        product.uid,
                        "mainCountry.countryId"
                      )
                    }
                  />
                ) : (
                  <p className={css.psd}>{product.mainCountry.countryId}</p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="checkbox"
                    checked={editFields[product.uid].check}
                    onChange={() => handleCheckboxChange(product.uid, "check")}
                  />
                ) : (
                  <span>{product.check ? "Так" : "Ні"}</span>
                )}
              </td>

              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].cr}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "cr")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.cr} </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].funnels}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "funnels")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.funnels} </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].traficSource}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "traficSource")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.traficSource} </p>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].comment}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "comment")
                    }
                  />
                ) : (
                  <p className={css.psd}> {product.comment} </p>
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
export default withFirebaseCollection("request")(AfilateUseAdm);
