import { Link } from "react-router-dom";
import css from "./header.module.css";
import { useEffect, useState } from "react";
import { checkRegistration } from "../../../function/authUtils";
import Contact from "./contact";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
export default function HeaderForRecruit({ currentUser }) {
  const [openContact, setOpenContact] = useState(false);
  const [headerSticky, setHeaderSticky] = useState(false);
  const { firstName, userId } = checkRegistration();
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
  //////////////to all
  const [windowDimensions, setWindowDimensions] = useState(false);
  const [burgerCLick, setBurgerCLick] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1100) {
        setWindowDimensions(false);
      } else {
        setWindowDimensions(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const openBurgerMenu = () => {
    setBurgerCLick(true);
  };
  const closeBurgerMenu = () => {
    setBurgerCLick(false);
  };

  ///////////////////
  return (
    <header className={`${css.headerWrap} ${headerSticky ? css.sticky : ""}`}>
      <Link className={css.logo} to="/">
        <h1 className={css.logo}>
          JTEfx
          <span className={css.spanLogo}>Job Traffic Employee</span>
        </h1>
      </Link>
      {windowDimensions ? (
        <>
          <nav className={css.navStyle}>
            <ul className={css.navUlRec}>
              <Link to="/" className={css.navLi}>
                <li className={css.navLi}>Головна</li>
              </Link>
              <Link to="/vacancy" className={css.navLi}>
                <li className={css.navLi}>Вакансії</li>
              </Link>
              <Link to="/recruit" className={css.navLi}>
                <li className={css.navLi}>Мій профіль</li>
              </Link>
            </ul>
          </nav>
          <Link to="/recruit" className={css.navLiWr}>
            <div className={css.iconWrapRec}>
              <div className={css.online}>ONLINE</div>
              {currentUser.imageUlr === "" && (
                <div className={css.circul}>{firstName[0]}</div>
              )}
              {currentUser.imageUlr !== "" && (
                <img
                  className={css.circulImg}
                  src={currentUser.imageUlr}
                  alt=""
                />
              )}
              <p className={css.navLi}>{firstName}</p>
            </div>
          </Link>
        </>
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
            <Link to="/vacancy" className={css.listLi}>
              <li className={css.listLi}>Вакансії</li>
            </Link>
            <Link to="/recruit" className={css.listLi}>
              <li className={css.listLi}>Мій профіль</li>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
