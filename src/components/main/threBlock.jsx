import css from "./main.module.css";
export default function ThreBlock() {
  return (
    <section className={css.wrapBlackB}>
      <p className={css.needReg}>Цікавлять наші сервіси?</p>
      <button className={css.purch}>Зареєструйся</button>
    </section>
  );
}
