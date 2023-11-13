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
          <p className={css.deckWak}>Для HR та рекрутерів</p>
          <p className={css.hpd}>
            Зручний інструмент для пошуку активних кандидатів із релевантним
            досвідом.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
        <animated.div style={fadeOut} className={css.wrapFir}>
          <p className={css.number}>2</p>
          <p className={css.deckWak}>Для Шукачів Роботи</p>
          <p className={css.hpd}>
            Вивчення ринку праці та можливість обрати найкращу пропозицію для
            себе серед тих, що пропонує ринок.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
      </animated.div>
      <p className={css.serviceOD}>Трафік-Менеджмент Платформа</p>
      <animated.div style={fadeIn} className={css.wrapSer}>
        <animated.div style={fadeIn} className={css.wrapFir}>
          <p className={css.number}>3</p>
          <p className={css.deckWak}>Для Brand Manager</p>
          <p className={css.hpd}>
            Ви зможете ефективно продати свій трафік ,шляхом виставлення своєї
            пропозиції на нашій платформі серед Affiliate менеджерів(кожен зможе
            написати відгук про якість трафіку)
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
        <animated.div style={fadeOut} className={css.wrapFir}>
          <p className={css.number}>4</p>
          <p className={css.deckWak}>Для Affiliate manager</p>
          <p className={css.hpd}>
            Ви зможете легко знайти потрібний трафік з допомогою нашого сервісу
            та переконатись у його якості перед купівлею, за відгуками
            користувачів.
          </p>
          <p className={css.registerBU}>Реєстріція</p>
        </animated.div>
      </animated.div>
    </animated.section>
  );
}
