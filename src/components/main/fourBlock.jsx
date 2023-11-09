import css from "./main.module.css";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";
import { BsStack, BsSafe2 } from "react-icons/bs";

export default function FourBlock() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація спрацьовуватиме лише один раз при потраплянні в поле зору
  });
  const props = useSpring({
    opacity: inView ? 1 : 0,
    from: { opacity: 0 },
    config: config.slow,
  });

  const fadeOut = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0%)" : "translateY(-100%)",
    config: config.slow,
  });

  return (
    <section className={css.fourSectionWrap}>
      <h3 className={css.serviceO}>Наші переваги</h3>
      <animated.div ref={ref} style={props} className={css.wrapPrev}>
        <animated.div style={fadeOut} className={css.blackWithIcon}>
          <MdOutlineMonetizationOn className={css.mdOutlineMonetizationOn} />
          <p className={css.titleM}>Прозора система оплати</p>
          <p className={css.titleMDesc}>
            Проста, прозора та зрозуміла система оплати для максимальної
            ефективності та довіри.
          </p>
        </animated.div>
        <animated.div style={fadeOut} className={css.blackWithIcon}>
          <BsStack className={css.mdOutlineMonetizationOn} />
          <p className={css.titleM}>Інтерфейс</p>
          <p className={css.titleMDesc}>
            Інтерфейс: створений для вашої зручності, інтуїтивно зрозумілий та
            ефективний у взаємодії.
          </p>
        </animated.div>
        <animated.div style={fadeOut} className={css.blackWithIcon}>
          <BsSafe2 className={css.mdOutlineMonetizationOn} />
          <p className={css.titleM}>Надійність</p>
          <p className={css.titleMDesc}>
            Надійність: невід'ємна впевненість у стійкості, яка супроводжує вас
            на кожному етапі.
          </p>
        </animated.div>
      </animated.div>
    </section>
  );
}
