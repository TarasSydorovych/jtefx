import { Link } from "react-router-dom";
import css from "./header.module.css";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Contact from "./contact";
export default function HeaderWhite({ windowDimensions }) {
  const [openContact, setOpenContact] = useState(false);
  const [headerSticky, setHeaderSticky] = useState(false);
  const [burgerCLick, setBurgerCLick] = useState(false);

  const openBurgerMenu = () => {
    setBurgerCLick(true);
  };
  const closeBurgerMenu = () => {
    setBurgerCLick(false);
  };
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
      {windowDimensions ? (
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
      ) : (
        <>
          <RxHamburgerMenu
            onClick={openBurgerMenu}
            className={css.rxHamburgerMenuWhite}
          />
        </>
      )}
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirsWhite}></span>
        <span className={css.hambSpSecontWhite}></span>
        <span className={css.hambSpThreWhite}></span>
      </div>
      {openContact && <Contact setOpenContact={setOpenContact} />}
      {burgerCLick && (
        <div className={css.burgerMenuWrap}>
          <AiOutlineClose
            onClick={closeBurgerMenu}
            className={css.closeBurgerMenu}
          />
          <ul className={css.listStyle}>
            <Link to="/" className={css.listLi}>
              <li className={css.listLi}>Головна</li>
            </Link>
            <Link to="/blog" className={css.listLi}>
              <li className={css.listLi}>Блог</li>
            </Link>
            <Link to="/recruit" className={css.listLi}>
              <li className={css.listLi}>Рекрутинг</li>
            </Link>
            <Link to="/brand" className={css.listLi}>
              <li className={css.listLi}>Маркетинг</li>
            </Link>
            <Link to="/auth" className={css.listLi}>
              <li className={css.listLi}>Реєстрація</li>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
