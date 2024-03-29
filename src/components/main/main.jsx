import Header from "../standartComponent/header/header";
import FirstBlock from "./firstBlock";
import FourBlock from "./fourBlock";
import css from "./main.module.css";
import SecondBlock from "./secondBlock";
import ThreBlock from "./threBlock";
export default function Main({ windowDimensions }) {
  return (
    <>
      <Header windowDimensions={windowDimensions} />

      <div className={css.allWrapInFirst}>
        <FirstBlock />
        <SecondBlock />
        <ThreBlock />
        <FourBlock />
      </div>
    </>
  );
}
