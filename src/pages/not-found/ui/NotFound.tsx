import { BackIcon } from "@/shared/ui/icons/BackIcon";
import styles from "./NotFound.module.sass";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content}>
      <img src="/not-found.png" alt="" />
      <p>Кажется, страница не найдена..</p>
      <button className={styles.btn} onClick={() => navigate("/home-page")}>
        <BackIcon />
        Вернуться назад
      </button>
    </div>
  );
};
