import { useEffect, useState } from "react";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import HeaderWhite from "../standartComponent/header/headerWhite";
import Article from "./article";
import css from "./blog.module.css";
import ListCat from "./listCat";
const Blog = ({ data }) => {
  const [category, setCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(2);
  const showMoreArticles = () => {
    // Показати ще 2 статі
    setVisibleArticles((prevCount) => prevCount + 2);
  };
  useEffect(() => {
    // Фільтруємо дані за обраною категорією
    const filteredArticles = data.filter((el) => el.category === category);
    setFilteredData(filteredArticles);
  }, [category, data]);
  console.log(data);
  return (
    <>
      <HeaderWhite />
      <section className={css.blogWrap}>
        <div className={css.titleWrapBlog}>
          <h1 className={css.blogH1}>Блог</h1>
        </div>
        <div className={css.dataWrap}>
          <ListCat setCategory={setCategory} />
        </div>
        <div className={css.dataWrap}>
          {category
            ? // Якщо обрана категорія, виводимо відфільтровані дані
              filteredData
                .slice(0, visibleArticles)
                .map((el, index) => <Article el={el} key={index} />)
            : // Якщо категорія не обрана, виводимо всі дані
              data
                .slice(0, visibleArticles)
                .map((el, index) => <Article el={el} key={index} />)}
        </div>
        {visibleArticles < (category ? filteredData.length : data.length) && (
          <button className={css.buttonCategory} onClick={showMoreArticles}>
            Показати ще
          </button>
        )}
        {visibleArticles >= (category ? filteredData.length : data.length) && (
          <p className={css.buttonCategory}>Немає більше статей</p>
        )}
      </section>
    </>
  );
};
export default withFirebaseCollection("blog")(Blog);
