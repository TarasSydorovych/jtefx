import { Link } from "react-router-dom";
import css from "./header.module.css";
import { useEffect, useState } from "react";

import Contact from "./contact";
export default function HeaderWhite() {
  const [openContact, setOpenContact] = useState(false);
  const [headerSticky, setHeaderSticky] = useState(false);
  const open = () => {
    setOpenContact(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setHeaderSticky(true);
    } else {
      setHeaderSticky(false);
    }
  };
  return (
    <header className={`${css.headerWrap} ${headerSticky ? css.sticky : ""}`}>
      <Link className={css.logoWhite} to="/">
        <h1 className={css.logoWhite}>
          JTEfx
          <span className={css.spanLogoWhite}>Job Traffic Employee</span>
        </h1>
      </Link>
      <nav className={css.navStyle}>
        <ul className={css.navUl}>
          <Link to="/" className={css.navLiWhite}>
            <li className={css.navLiWhite}>Головна</li>
          </Link>
          <Link to="/blog" className={css.navLiWhite}>
            <li className={css.navLiWhite}>Блог</li>
          </Link>
          <Link to="/recruit" className={css.navLiWhite}>
            <li className={css.navLiWhite}>Рекрутинг</li>
          </Link>
          <Link to="/" className={css.navLiWhite}>
            <li className={css.navLiWhite}>Маркетинг</li>
          </Link>
          <Link to="/auth" className={css.navLiWhite}>
            <li className={css.navLiWhite}>Реєстрація</li>
          </Link>
        </ul>
      </nav>
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirsWhite}></span>
        <span className={css.hambSpSecontWhite}></span>
        <span className={css.hambSpThreWhite}></span>
      </div>
      {openContact && <Contact setOpenContact={setOpenContact} />}
    </header>
  );
}
