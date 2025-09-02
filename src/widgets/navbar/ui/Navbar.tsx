import { CalendarIcon, HomeIcon, RandomIcon, SearchIcon } from "@/shared/ui/icons";
import styles from "./Navbar.module.sass";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { SearchT, TitleItem } from "@/shared/types/TitleT";

export const Navbar = () => {
  const [data, setData] = useState<SearchT>({
    list: [],
    status: {
      loading: false,
    },
    filters: {
      query: "",
    },
  });
  const [show, setShow] = useState(false);
  const [debounceQuery] = useDebounce(data?.filters.query, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setData((prev) => ({
        ...prev,
        status: {
          loading: true,
        },
      }));
      const resp = await AnilibriaApi.searchTitle({
        ...data.filters,
      });
      if (resp.data) {
        setData((prev) => ({
          ...prev,
          list: resp.data,
          status: {
            loading: false,
          },
        }));
      }
    } catch (err) {
      console.error(err);
      setData((prev) => ({
        ...prev,
        statuses: {
          loading: false,
        },
      }));
    }
  };

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

  useEffect(() => {
    if (debounceQuery) {
      fetchData();
    }
  }, [debounceQuery]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.nav_links}>
          <p
            onClick={() => navigate("/")}
            className={`${styles.nav_link} ${location.pathname === "/home-page" ? styles.active : ""}`}
          >
            Главная
          </p>
          <p
            className={`${styles.nav_link} ${location.pathname === "/schedule-page" ? styles.active : ""}`}
            onClick={() => navigate("schedule-page")}
          >
            Расписание
          </p>
          <p className={styles.nav_link} onClick={getRandom}>
            Случайное
          </p>
        </div>
        <div className={styles.nav_search}>
          <div className={styles.search} onClick={() => setShow((prev) => !prev)}>
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className={styles.nav_mobile_search} onClick={() => setShow(true)}>
        <label htmlFor="searchMobile">
          <SearchIcon />
          <input type="text" id="searchMobile" placeholder="Поиск тайтлов" />
        </label>
      </div>

      <div className={styles.bottom_bar}>
        <div
          className={`${styles.bottom_bar_item} ${location.pathname === "/home-page" ? styles.active : ""}`}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </div>
        <div className={styles.bottom_bar_item} onClick={getRandom}>
          <RandomIcon />
        </div>
        <div
          className={`${styles.bottom_bar_item} ${location.pathname === "/schedule-page" ? styles.active : ""}`}
          onClick={() => navigate("schedule-page")}
        >
          <CalendarIcon />
        </div>
      </div>

      <div className={`${styles.overlay} ${show ? styles.active : ""}`} onClick={() => setShow(false)}></div>
      <div className={`${styles.modal} ${show ? styles.active : ""}`}>
        <label htmlFor="search">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            id="search"
            placeholder="Поиск тайтлов"
            onChange={(e: any) =>
              setData((prev: any) => ({
                ...prev,
                filters: {
                  query: e.target.value,
                },
              }))
            }
          />
        </label>
        <div className={styles.content}>
          {data?.status?.loading ? (
            <div className={styles.loading}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <div className={styles.items}>
              {data?.list?.length >= 1 ? (
                <>
                  {data?.list.map((e: TitleItem) => (
                    <div key={e.id} className={styles.item} onClick={() => navigate(`/anime-details/${e.id}`)}>
                      <img src={`https://www.anilibria.tv${e.poster.optimized.src}`} loading="lazy" alt="" />
                      <div className={styles.item_info}>
                        <h2 className={styles.item_title}>{e.name.main}</h2>
                        <h2 className={styles.item_subtitle}>{e.name.english}</h2>
                        <p className={styles.item_status}>
                          {e.type.value} • {e.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                "Нет данных"
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
