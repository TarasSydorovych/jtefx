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

const UserSet = ({ data }) => {
  const [products, setProducts] = useState([]);
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      setProducts(data);
    }
  }, [data]);

  const handleEditFieldChange = (event, uid, fieldName) => {
    const { value } = event.target;
    console.log("userId", uid);
    console.log("fieldName", fieldName);
    console.log("value", value);
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [uid]: {
        ...prevEditFields[uid],
        [fieldName]: value,
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
      await updateDoc(doc(collection(db, "users"), uid), {
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
  const handleVarningChange = (uid, index, value) => {
    setEditFields((prevEditFields) => ({
      ...prevEditFields,
      [uid]: {
        ...prevEditFields[uid],
        varning: prevEditFields[uid].varning.map((item, i) =>
          i === index ? { ...item, check: value === true } : item
        ),
      },
    }));
  };
  console.log("editFields", editFields);
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
            <th>ID</th>
            <th>Імʼя</th>
            <th>Баланс</th>
            <th>Видимість</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Роль</th>
            <th>Логін в tg</th>
            <th>Попередження</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.uid}>
              <td>{product.uid}</td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].firstName}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "firstName")
                    }
                  />
                ) : (
                  product.firstName
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].balance}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "balance")
                    }
                  />
                ) : (
                  product.balance
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="checkbox"
                    checked={editFields[product.uid].inBlock}
                    onChange={() =>
                      handleCheckboxChange(product.uid, "inBlock")
                    }
                  />
                ) : (
                  <span>{product.inBlock ? "Так" : "Ні"}</span>
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].mail}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "mail")
                    }
                  />
                ) : (
                  product.mail
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].phone}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "phone")
                    }
                  />
                ) : (
                  product.phone
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].role}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "role")
                    }
                  />
                ) : (
                  product.role
                )}
              </td>
              <td>
                {editFields[product.uid] ? (
                  <input
                    type="text"
                    value={editFields[product.uid].username}
                    onChange={(e) =>
                      handleEditFieldChange(e, product.uid, "username")
                    }
                  />
                ) : (
                  product.username
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
                {editFields[product.uid]
                  ? editFields[product.uid].varning.map((item, index) => (
                      <div key={index} className={css.checkboxContainer}>
                        <input
                          type="checkbox"
                          checked={item.check}
                          onChange={(e) =>
                            handleVarningChange(
                              product.uid,
                              index,
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    ))
                  : product.varning.map((item, index) => (
                      <div key={index} className={css.checkboxContainer}>
                        Статус перевірки:
                        {item.check === false && "Не перевірено"}
                        {item.check === true && "Перевірено"}
                        <a
                          href={`/admchat/${item.chatId}?${product.userId}`}
                          target="_blanck"
                        >
                          (ЧАТ)
                        </a>
                      </div>
                    ))}
              </td>
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
export default withFirebaseCollection("users")(UserSet);
