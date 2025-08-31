import { Link, useNavigate } from "react-router-dom";
import styles from "./Footer.module.sass";
import { InstIcon } from "@/shared/ui/icons/InstIcon";
import { TelegramIcon } from "@/shared/ui/icons/TelegramIcon";
import { GitIcon } from "@/shared/ui/icons/GitIcon";
import { LinkedinIcon } from "@/shared/ui/icons/LinkedinIcon";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";

export const Footer = () => {
  const navigate = useNavigate();

  const getRandom = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await AnilibriaApi.getRandom();
      if (resp.data) {
        navigate(`/anime-details/${resp.data[0].id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={styles.footer}>
        <h2 className={styles.footer_logo} onClick={() => navigate("/home-page")}>
          AnimeProject
        </h2>
        <div className={styles.footer_nav}>
          <p className={styles.footer_nav_item} onClick={() => navigate("/")}>
            Главная
          </p>
          <p className={styles.footer_nav_item} onClick={() => navigate("schedule-page")}>
            Расписание
          </p>
          <p className={styles.footer_nav_item} onClick={getRandom}>
            Случайное
          </p>
        </div>
        <p className={styles.footer_text}>
          Сайт использует <span>Anilibria API.</span>
        </p>
        <div className={styles.footer_right}>
          <div className={styles.footer_social}>
            <Link to="https://www.instagram.com/kharun04/" target="_blank" className={styles.footer_social_item}>
              <InstIcon />
            </Link>
            <Link to="https://t.me/MrIrty" target="_blank" className={styles.footer_social_item}>
              <TelegramIcon />
            </Link>
            <Link to="https://github.com/Kharun" target="_blank" className={styles.footer_social_item}>
              <GitIcon />
            </Link>
            <Link
              to="https://www.linkedin.com/in/kharun-mashanlo-4532b3347/"
              target="_blank"
              className={styles.footer_social_item}
            >
              <LinkedinIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
