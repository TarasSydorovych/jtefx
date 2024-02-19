import { Link, useNavigate } from "react-router-dom";
import css from "./header.module.css";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

import Contact from "./contact";
import { checkRegistration } from "../../../function/authUtils";
export default function Header({ windowDimensions }) {
  const navigate = useNavigate();
  const [openContact, setOpenContact] = useState(false);
  const [headerSticky, setHeaderSticky] = useState(false);
  const [burgerTrue, setBurgerTrue] = useState(false);
  const [burgerCLick, setBurgerCLick] = useState(false);
  const open = () => {
    setOpenContact(true);
  };
  const { isRegistered, role, userId } = checkRegistration();
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
  const openBurgerMenu = () => {
    setBurgerCLick(true);
  };
  const closeBurgerMenu = () => {
    setBurgerCLick(false);
  };
  const reqL = () => {
    if (role === "hr" || role === "worker") {
      navigate("/recruit");
    } else {
      navigate("/auth");
    }
  };
  const brandL = () => {
    if (role === "brand" || role === "afilate") {
      navigate("/brand");
    } else {
      navigate("/auth");
    }
  };
  return (
    <header className={`${css.headerWrap} ${headerSticky ? css.sticky : ""}`}>
      <Link className={css.logo} to="/">
        <h1 className={css.logo}>
          JTEfx
          <span className={css.spanLogo}>Job Traffic Employee</span>
        </h1>
      </Link>
      {windowDimensions ? (
        <nav className={css.navStyle}>
          <ul className={css.navUl}>
            <Link to="/" className={css.navLi}>
              <li className={css.navLi}>Головна</li>
            </Link>
            <Link to="/blog" className={css.navLi}>
              <li className={css.navLi}>Блог</li>
            </Link>

            <li onClick={reqL} className={css.navLi}>
              Рекрутинг
            </li>

            <li onClick={brandL} className={css.navLi}>
              Маркетинг
            </li>

            <Link to="/auth" className={css.navLi}>
              <li className={css.navLi}>Реєстрація</li>
            </Link>
          </ul>
        </nav>
      ) : (
        <>
          <RxHamburgerMenu
            onClick={openBurgerMenu}
            className={css.rxHamburgerMenu}
          />
        </>
      )}
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirs}></span>
        <span className={css.hambSpSecont}></span>
        <span className={css.hambSpThre}></span>
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

            <li onClick={reqL} className={css.listLi}>
              Рекрутинг
            </li>

            <li onClick={brandL} className={css.listLi}>
              Маркетинг
            </li>

            <Link to="/auth" className={css.listLi}>
              <li className={css.listLi}>Реєстрація</li>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
