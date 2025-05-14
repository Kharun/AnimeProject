import { useState } from "react";
import styles from "./Card.module.sass";

interface CardProps {
  title: string;
  img: string;
  desc: string;
  onClick: VoidFunction;
}

export const Card = ({ title, img, desc, onClick }: CardProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={styles.card}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={onClick}
      >
        <div className={styles.card_bg}>
          <img src={`https://www.anilibria.tv${img}`} alt="" />
        </div>
        <div className={`${styles.card_title} ${!show ? "" : styles.hidden}`}>
          <h2>{title}</h2>
        </div>
        <div className={`${styles.show_content} ${show ? styles.active : ""}`}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>
      </div>
    </>
  );
};
