import FirstBlock from "./firstBlock";
import FourBlock from "./fourBlock";
import css from "./main.module.css";
import SecondBlock from "./secondBlock";
import ThreBlock from "./threBlock";
export default function Main() {
  return (
    <div className={css.allWrapInFirst}>
      <FirstBlock />
      <SecondBlock />
      <ThreBlock />
      <FourBlock />
    </div>
  );
}
