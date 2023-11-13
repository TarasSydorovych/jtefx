import css from "./foter.module.css";
import { AiOutlineClose, AiOutlineWhatsApp, AiFillPhone } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
export default function Footer() {
  return (
    <footer className={css.footerWrap}>
      <h4 className={css.foterh4}>
        JTEFX
        <span className={css.spanLogo}>Job Traffic Employee</span>
      </h4>
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
      <p className={css.year}>2023 JTEFX Всі права захищені</p>
      <a href="https://webui-studio.com/" target="_blanck" className={css.web}>
        WebUi-розробка та підтримка
      </a>
    </footer>
  );
}
