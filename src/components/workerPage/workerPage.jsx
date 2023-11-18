import { useParams } from "react-router-dom";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import { useEffect, useState } from "react";

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
  return <></>;
};
export default withFirebaseCollection("users")(WorkerPage);
