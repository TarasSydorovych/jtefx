import withFirebaseCollection from "../HOK/withFirebaseCollection";
import css from "./blog.module.css";
const ListCat = ({ data, setCategory }) => {
  return (
    <ul className={css.ulCatWr}>
      <li className={css.listLi} key={"21232"} onClick={() => setCategory("")}>
        Усі
      </li>
      {data.map((el, index) => {
        return (
          <li
            className={css.listLi}
            key={index}
            onClick={() => setCategory(el.catName)}
          >
            {el.catName}
          </li>
        );
      })}
    </ul>
  );
};
export default withFirebaseCollection("blogCategory")(ListCat);
