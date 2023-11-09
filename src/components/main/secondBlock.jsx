import css from "./main.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";

export default function SecondBlock() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація спрацьовуватиме лише один раз при потраплянні в поле зору
  });
  const props = useSpring({
    opacity: inView ? 1 : 0,
    from: { opacity: 0 },
    config: config.slow,
  });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0%)" : "translateX(-100%)",
    config: config.slow,
  });
  const fadeOut = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateX(0%)" : "translateX(+700px)",
    config: config.slow,
  });
  return (
    <animated.section ref={ref} style={props} className={css.secondBlockWr}>
      <h3 className={css.serviceO}>Наші послуги</h3>
      <p className={css.serviseP}>
        У нас декілька напрямків діяльності нашого ресурсу.{" "}
      </p>
      <p className={css.serviceOD}>Рекрутингова Платформа</p>
      <animated.div style={fadeIn} className={css.wrapSer}>
        <animated.div style={fadeIn} className={css.wrapFir}>
          <p className={css.number}>1</p>
          <p className={css.deckWak}>Для рекрутерів</p>
          <p className={css.hpd}>
            Зручний інструмент для пошуку, відбору та звітування про кандидатів.
            Аналіз резюме, відстеження процесу найму та комунікація зі шукачами
            роботи.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
        <animated.div style={fadeOut} className={css.wrapFir}>
          <p className={css.number}>2</p>
          <p className={css.deckWak}>Для шукачів роботи</p>
          <p className={css.hpd}>
            Персоналізований пошук вакансій, можливість вивчення ринку праці та
            отримання порад щодо кар'єрного зростання.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
      </animated.div>
      <p className={css.serviceOD}>Трафік-Менеджмент Платформа</p>
      <animated.div style={fadeIn} className={css.wrapSer}>
        <animated.div style={fadeIn} className={css.wrapFir}>
          <p className={css.number}>3</p>
          <p className={css.deckWak}>Для менеджерів</p>
          <p className={css.hpd}>
            Ефективне керування та аналіз трафіку, інструменти для таргетування
            та оптимізації рекламних кампаній.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
        <animated.div style={fadeOut} className={css.wrapFir}>
          <p className={css.number}>4</p>
          <p className={css.deckWak}>Для покупців трафіку</p>
          <p className={css.hpd}>
            Можливість точного таргетування аудиторії, аналіз результативності
            та максимізація конверсій через покупку якісного трафіку.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
      </animated.div>
    </animated.section>
  );
}
