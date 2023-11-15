import { useState } from "react";
import css from "./recruitFrec.module.css";
export default function Profile() {
  const [posada, setPosada] = useState("");

  return (
    <section className={css.profileWrap}>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Посада</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Категорія</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Навички</p>
        <textarea
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Досвід роботи</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Зарплатні очікування</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Країна перебування</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Місто перебування</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Рівень англійської</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Досвід роботи</p>
        <textarea
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Досягнення</p>
        <textarea
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Очікування</p>
        <textarea
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Погодинна ставка</p>
        <input
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
      <div className={css.wrapSec}>
        <p className={css.pPosada}>Питання до роботодавця</p>
        <textarea
          className={css.inputSt}
          value={posada}
          onChange={(e) => setPosada(e.target.value)}
        />
      </div>
    </section>
  );
}
