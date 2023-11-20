import { Link } from "react-router-dom";
import css from "./header.module.css";
import { useEffect, useState } from "react";
import { checkRegistration } from "../../../function/authUtils";
import Contact from "./contact";
export default function HeaderForHr({ currentUser }) {
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
  return (
    <header className={`${css.headerWrap} ${headerSticky ? css.sticky : ""}`}>
      <Link className={css.logo} to="/">
        <h1 className={css.logo}>
          JTEfx
          <span className={css.spanLogo}>Job Traffic Employee</span>
        </h1>
      </Link>
      <nav className={css.navStyle}>
        <ul className={css.navUlHr}>
          <Link to="/" className={css.navLi}>
            <li className={css.navLi}>Головна</li>
          </Link>
          <Link to="/blog" className={css.navLi}>
            <li className={css.navLi}>Вакансії</li>
          </Link>
          <Link to="/recruit/add" className={css.navLi}>
            <li className={css.navLi}>Додати вакансію</li>
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
            <img className={css.circulImg} src={currentUser.imageUlr} alt="" />
          )}
          <p className={css.navLi}>{firstName}</p>
        </div>
      </Link>
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirs}></span>
        <span className={css.hambSpSecont}></span>
        <span className={css.hambSpThre}></span>
      </div>
      {openContact && <Contact setOpenContact={setOpenContact} />}
    </header>
  );
}
