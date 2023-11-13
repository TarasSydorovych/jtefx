import { useParams } from "react-router-dom";
import withFirebaseCollection from "../HOK/withFirebaseCollection";
import HeaderWhite from "../standartComponent/header/headerWhite";
import css from "./blogPage.module.css";
import { useEffect, useState } from "react";
import keyWord from "../../function/keyWord";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillPencilFill, BsFillPersonFill } from "react-icons/bs";
import TwoBlock from "./twoBlock";
import ThreBlock from "./threBlock";

const BlogPage = ({ data }) => {
  let params = useParams();
  const [curProd, setCurProd] = useState({});
  const [haveProd, setHaveProd] = useState(false);
  useEffect(() => {
    let isMounted = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].uid === params.id) {
        setCurProd(data[i]);
        setHaveProd(true);
      }
    }
  }, [data]);
  if (haveProd) {
    keyWord(`${curProd.seoTitle}`, `${curProd.seoDescription}`);
  }
  return (
    <>
      <HeaderWhite />
      {haveProd && (
        <section className={css.blagWrap}>
          <div className={css.titleWrapBlog}>
            <div className={css.divWrap}>
              <img
                src={curProd.fotoUrl}
                className={css.picBl}
                alt={`${curProd.title}`}
              />
            </div>
            <h1 className={css.blogH1}>{curProd.title}</h1>
            <div className={css.wraptimeDate}>
              <p className={css.timeD}>
                <FaCalendarAlt className={css.faCalendarAlt} />
                {curProd.addData}
              </p>
              <p className={css.timeD}>
                <BsFillPersonFill className={css.faCalendarAlt} />
                JTEfx
              </p>
              <p className={css.timeD}>
                <BsFillPencilFill className={css.faCalendarAlt} />
                {curProd.category}
              </p>
            </div>
          </div>
          <TwoBlock curProd={curProd} />
          <ThreBlock curProd={curProd} />
        </section>
      )}
    </>
  );
};
export default withFirebaseCollection("blog")(BlogPage);
