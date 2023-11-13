import css from "./header.module.css";
import { AiOutlineClose, AiOutlineWhatsApp, AiFillPhone } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FiMail } from "react-icons/fi";

export default function Contact({ setOpenContact }) {
  return (
    <section className={css.contactWrap}>
      <div className={css.smallWrap}>
        <AiOutlineClose
          className={css.aiOutlineClose}
          onClick={() => setOpenContact(false)}
        />
        <h2 className={css.logoInContact}>JTEFX</h2>
        <p className={css.smallDescContact}>
          Вітаємо JTEfx (можна і на сайті літери fx зробити меньшими?) Цей сайт
          було сворено для вигідної комунікації між HR-роботодавцем та
          кандидатами. Також за допомогою нашої платформи Ви зможете купувати та
          продавати якісний трафік для різних сфер діяльності. Приєднуйтесь до
          нас та розкрийте потенціал нових можливостей і партнерств.
        </p>
        <div className={css.iconWrap}>
          <div className={css.theIcon}>
            <FaViber className={css.faViber} />
          </div>
          <div className={css.theIcon}>
            <AiOutlineWhatsApp className={css.faViber} />
          </div>
          <div className={css.theIcon}>
            <PiTelegramLogoLight className={css.faViber} />
          </div>
          <div className={css.theIcon}>
            <AiFillPhone className={css.faViber} />
          </div>
        </div>
        <p className={css.labCon}>Наші контакти</p>
        <div className={css.wrapContact}>
          <CiLocationOn className={css.ciLocationOn} />
          <p className={css.pLoc}>м. Київ, вул. Центральна 1</p>
        </div>
        <div className={css.wrapContact}>
          <FiMail className={css.ciLocationOn} />
          <p className={css.pLoc}>jtefx.h@gmail.com</p>
        </div>
        <div className={css.wrapContact}>
          <AiFillPhone className={css.ciLocationOn} />
          <p className={css.pLoc}>+38(093) 00 - 00 - 000</p>
        </div>
      </div>
    </section>
  );
}
