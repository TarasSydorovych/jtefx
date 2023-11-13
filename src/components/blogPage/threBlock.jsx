import css from "./blogPage.module.css";

export default function ThreBlock({ curProd }) {
  return (
    <section className={css.titleWrapBlog}>
      <div className={css.divWrap}>
        <img
          src={curProd.fotoUrl}
          className={css.picBlTh}
          alt={`${curProd.title}`}
        />
      </div>
      <h3 className={css.threH3}>Є запитання?</h3>
      <p className={css.threP}>Напиши нам в телеграм</p>
      <a href="https://t.me/tu_mon_ami" className={css.theBut}>
        Написати
      </a>
    </section>
  );
}
