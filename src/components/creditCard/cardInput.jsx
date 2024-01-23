import React, { useEffect, useState } from "react";
import styles from "./credit.module.css"; // Підключення стилів
import axios from "axios";
import { db } from "../../function/firebase";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import HeaderForHr from "../standartComponent/header/headerForHr";
import HeaderForBrand from "../standartComponent/header/headerForBrand";
import Footer from "../standartComponent/footer/foter";

const CardInput = ({ data, userId }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [howMush, setHowMush] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isCardNumberDirty, setIsCardNumberDirty] = useState(false);
  const [isExpiryDateValid, setIsExpiryDateValid] = useState(true);
  const [isExpiryDateDirty, setIsExpiryDateDirty] = useState(false);
  const [isExpiryCsvValid, setIsExpiryCsvValid] = useState(true);
  const [isExpiryCsvDirty, setIsExpiryCsvDirty] = useState(false);

  useEffect(() => {
    // Find the user with the matching userId in the data array
    const user = data.find((user) => user.userId === userId);
    setCurrentUser(user);
  }, [data, userId]);
  const updateUserInvoiceInFirebase = async (
    amount,
    ccy,
    createdDate,
    invoiceId,
    modifiedDate,
    status
  ) => {
    try {
      const vacanciesCollection = collection(db, "invoice");

      // Створення об'єкта з даними для додавання до колекції
      const vacancyData = {
        amount,
        ccy,
        createdDate,
        invoiceId,
        modifiedDate,
        status,
      };

      // Додавання даних до колекції
      const docRef = await addDoc(vacanciesCollection, vacancyData);

      // Отримання ID новоствореного документа (вашого вакансії)
      const newVacancyId = docRef.id;
      await updateDoc(docRef, { uid: newVacancyId });
      // Організація перезавантаження сторінки після успішного додавання
      if (newVacancyId) {
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const onBlurCardNumber = () => {
    setIsCardNumberDirty(true);
  };
  ////////////

  const onBlurExpiryDate = () => {
    setIsExpiryDateDirty(true);
  };
  const onBlurExpiryCsv = () => {
    setIsExpiryCsvDirty(true);
  };
  ////////////////////////
  useEffect(() => {
    setIsExpiryCsvValid(/^\d{3}$/.test(cvv.replace(/\s/g, "")));
    setIsExpiryDateValid(/^\d{4}$/.test(expiryDate.replace(/\s/g, "")));
    // Валідація номеру картки
    setIsCardNumberValid(/^\d{16}$/.test(cardNumber.replace(/\s/g, "")));
  }, [cardNumber, expiryDate]);
  const updateUserBalance = async (uid, newBalans) => {
    try {
      await updateDoc(doc(collection(db, "users"), uid), {
        balance: newBalans,
      });
    } catch {
      console.error("error");
    }
  };
  const createPayment = async () => {
    try {
      const payload = {
        amount: howMush,
        ccy: 980,
        cardData: {
          pan: cardNumber,
          exp: expiryDate,
          cvv: cvv,
        },
        merchantPaymInfo: {
          reference: "84d0070ee4e44667b31371d8f8813947",
          destination: "Покупка щастя",
          comment: "Покупка щастя",
          customerEmails: [],
          basketOrder: [],
        },
        webHookUrl:
          "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
        paymentType: "debit",
        saveCardData: {
          saveCard: true,
          walletId: "69f780d841a0434aa535b08821f4822c",
        },
        redirectUrl: "https://example.com/your/website/result/page",
        initiationKind: "merchant",
        tds: true,
      };
      const response = await axios.post(
        "http://localhost:3000/create-payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Token": "u1ZlZ8ddzRLOB7H9GL7N7-_nxRPJsQZHcdUi_dP00hEA", // Додайте свій токен
          },
        }
      );
      if (response.data && response.data.status === "success" && currentUser) {
        const revBal = response.data.amount + parseInt(currentUser.balance, 10);

        updateUserBalance(currentUser.uid, revBal);
        updateUserInvoiceInFirebase(
          response.data.amount,
          response.data.ccy,
          response.data.createdDate,
          response.data.invoiceId,
          response.data.modifiedDate,
          response.data.status
        );
      }
    } catch (error) {
      console.error("Error creating payment:", error.response.data);
    }
  };

  return (
    <>
      {currentUser && currentUser.role === "hr" && (
        <HeaderForHr currentUser={currentUser} />
      )}
      {currentUser && currentUser.role === "brand" && (
        <HeaderForBrand currentUser={currentUser} />
      )}
      <div className={styles.cardContainer}>
        <div className={styles.wrapForD}>
          <div className={styles.logoInf}>
            <h1 className={styles.logo}>
              JTEfx
              <span className={styles.spanLogo}>Job Traffic Employee</span>
            </h1>
          </div>
          <div className={styles.card}>
            <div className={styles.cardNumber}>
              <label>Номер карти</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                className={styles.cardNum}
                onChange={(e) => setCardNumber(e.target.value)}
                onBlur={onBlurCardNumber}
              />
              {isCardNumberDirty && !isCardNumberValid && (
                <p className={styles.errorMsg}>
                  Введіть правильний номер картки
                </p>
              )}
            </div>
            <div className={styles.cardHolder}>
              <label>Імʼя власника</label>
              <input
                className={styles.cardNum}
                type="text"
                placeholder="Імʼя"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
            <div className={styles.wrapCv}>
              <div className={styles.expiryDate}>
                <label>Дійсна до</label>
                <input
                  className={styles.cardNumSm}
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  onBlur={onBlurExpiryDate}
                />
              </div>

              <div className={styles.cvv}>
                <label>CVV</label>
                <input
                  className={styles.cardNumSm}
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onBlur={onBlurExpiryCsv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            {isExpiryDateDirty && !isExpiryDateValid && (
              <p className={styles.errorMsg}>
                Введіть правильний термін дії картки (MM/YY)
              </p>
            )}
            {isExpiryCsvDirty && !isExpiryCsvValid && (
              <p className={styles.errorMsg}>
                Введіть правильний CVV код в форматі (***)
              </p>
            )}
            <div className={styles.cardNumber}>
              <label>Сума поповнення в грн</label>
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Сума"
                value={howMush}
                className={styles.cardNum}
                onChange={(e) => setHowMush(parseInt(e.target.value, 10) || 0)}
              />
            </div>
            <button
              onClick={createPayment}
              className={styles.pay}
              disabled={!isCardNumberValid && !isExpiryDateValid}
            >
              Оплатити
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withFirebaseCollection("users")(CardInput);
