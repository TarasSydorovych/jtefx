import { Link } from "react-router-dom";
import css from "./blog.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

export default function Article({ el }) {
  return (
    <section className={css.articleWrap}>
      <Link to={`/blog/${el.uid}`} className={css.linkPic}>
        <img src={el.fotoUrl} className={css.imageSt} />
      </Link>
      <Link to={`/blog/${el.uid}`} className={css.descH2}>
        <h2 className={css.descH2}>{el.title}</h2>
      </Link>
      <p className={css.descP}>{el.description}</p>
      <div className={css.wraptimeDate}>
        <p className={css.timeD}>
          <FaCalendarAlt className={css.faCalendarAlt} />
          {el.addData}
        </p>
        <p className={css.timeD}>
          <BsFillPencilFill className={css.faCalendarAlt} />
          {el.category}
        </p>
      </div>
    </section>
  );
}
