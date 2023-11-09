import { Link } from "react-router-dom";
import css from "./header.module.css";
import { useState } from "react";

import Contact from "./contact";
export default function Header() {
  const [openContact, setOpenContact] = useState(false);
  const open = () => {
    setOpenContact(true);
  };
  return (
    <header className={css.headerWrap}>
      <Link className={css.logo} to="/">
        <h1 className={css.logo}>JTEFX</h1>
      </Link>
      <nav className={css.navStyle}>
        <ul className={css.navUl}>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Головна</li>
          </Link>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Блог</li>
          </Link>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Рекрутинг</li>
          </Link>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Маркетинг</li>
          </Link>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Реєстрація</li>
          </Link>
        </ul>
      </nav>
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirs}></span>
        <span className={css.hambSpSecont}></span>
        <span className={css.hambSpThre}></span>
      </div>
      {openContact && <Contact setOpenContact={setOpenContact} />}
    </header>
  );
}
