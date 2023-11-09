import css from "./main.module.css";
import fl from "../../img/sl.mp4";
export default function FirstBlock() {
  const scrollTo100vh = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth", // Додає плавний ефект прокрутки
    });
  };
  return (
    <section className={css.firstBlockWrap}>
      <video autoPlay loop muted className={css.videoBackground}>
        <source src={fl} type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
      <div className={css.wrapInfo}>
        <p className={css.h2Firs}>З нами ти знайдеш те що тобі потрібно</p>
        <h2 className={css.h2FirsD}>ласкаво просимо в jtefx</h2>
        <div className={css.buttonWrap}>
          <div onClick={scrollTo100vh} className={css.hrefA}>
            ДЕТАЛЬНІШЕ
          </div>
          <p className={css.or}>або</p>
          <button className={css.register}>ЗАРЕЄСТРУВАТИСЬ</button>
        </div>
      </div>
      <div className={css.skakalka} onClick={scrollTo100vh}>
        <div className={css.strv}></div>
      </div>
    </section>
  );
}
