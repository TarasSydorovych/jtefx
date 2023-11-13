import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../../function/firebase";

const withFirebaseCollection = (collectionName) => (WrappedComponent) => {
  const WithFirebaseCollection = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, collectionName));
          const fetchedData = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push(doc.data());
          });
          setData(fetchedData);
        } catch (error) {
          console.error("Помилка при отриманні документів:", error);
        }
      };

      fetchData();
    }, [collectionName]);

    return <WrappedComponent data={data} {...props} />;
  };

  return WithFirebaseCollection;
};

export default withFirebaseCollection;
