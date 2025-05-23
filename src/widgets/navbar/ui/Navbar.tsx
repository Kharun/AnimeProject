import { CalendarIcon, HomeIcon, RandomIcon, SearchIcon } from "@/shared/ui/icons";
import styles from "./Navbar.module.sass";
import { CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

export const Navbar = () => {
  const [data, setData] = useState({
    list: [
      {
        id: 0,
        names: {
          en: "",
          ru: "",
        },
        posters: {
          original: {
            url: "",
          },
        },
        description: "",
        status: {
          string: "",
        },
        genres: [],
      },
    ],
    statuses: {
      loading: false,
    },
    filters: {
      search: "",
    },
    pagination: {
      current_page: 1,
      items_per_page: 0,
      pages: 0,
      total_items: 0,
    },
    loadmore: false,
  });
  const [show, setShow] = useState(false);
  const [debounceQuery] = useDebounce(data.filters.search, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setData((prev) => ({
        ...prev,
        statuses: {
          loading: true,
        },
      }));
      const resp = await AnilibriaApi.searchTitle({
        ...data.filters,
      });
      if (resp.data) {
        setData((prev) => ({
          ...prev,
          list: resp.data.list,
          pagination: resp.data.pagination,
          statuses: {
            loading: false,
          },
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadMore = async () => {
    try {
      setData((prev) => ({
        ...prev,
        loadmore: true,
      }));
      const params = {
        search: data.filters.search,
        page: data.pagination.current_page + 1,
      };
      const resp = await AnilibriaApi.searchTitle(params);
      if (resp.data) {
        setData((prev) => ({
          ...prev,
          list: [...prev.list, ...resp.data.list],
          pagination: { ...prev.pagination, current_page: resp.data.current_page },
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setData((prev) => ({
        ...prev,
        loadmore: false,
      }));
    }
  };

  const getRandom = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await AnilibriaApi.getRandom();
      if (resp.data) {
        navigate(`/anime-details/${resp.data.id}`);
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
          <p onClick={() => navigate("/")} className={`${styles.nav_link} ${styles.active}`}>
            Главная
          </p>
          <p className={styles.nav_link} onClick={() => navigate("schedule-pages")}>
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
          className={`${styles.bottom_bar_item} ${location.pathname === "/" || "/home-page" ? styles.active : ""}`}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </div>
        <div className={styles.bottom_bar_item} onClick={getRandom}>
          <RandomIcon />
        </div>
        <div className={styles.bottom_bar_item} onClick={() => navigate("schedule-page")}>
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
              setData((prev) => ({
                ...prev,
                filters: {
                  search: e.target.value,
                },
              }))
            }
          />
        </label>
        <div className={styles.content}>
          {data.statuses.loading ? (
            <div className={styles.loading}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <div className={styles.items}>
              {data.list.length > 1 ? (
                <>
                  {data.list.map((e: any) => (
                    <div key={e.id} className={styles.item} onClick={() => navigate(`/anime-details/${e.id}`)}>
                      <img src={`https://www.anilibria.tv${e.posters.original?.url}`} alt="" />
                      <div className={styles.item_info}>
                        <p className={styles.item_status}>{e.status.string}</p>
                        <h2 className={styles.item_title}>{e.names.ru}</h2>
                        <p className={styles.item_genres}>{e.genres.join(", ")}</p>
                      </div>
                    </div>
                  ))}

                  {data.pagination.current_page < data.pagination.pages &&
                    (data.loadmore ? (
                      <div className={styles.loadmore}>
                        <CircularProgress size={24} />
                      </div>
                    ) : (
                      <div className={styles.show_more} onClick={loadMore}>
                        + Показать еще
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
