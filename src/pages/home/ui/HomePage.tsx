import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.sass";
import { ArrowLeftIcon, PlayIcon } from "@/shared/ui/icons";
import { Card } from "@/shared/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

export const HomePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState({
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
      },
    ],
    status: {
      loading: false,
    },
  });

  const fetchTitleList = async () => {
    try {
      setTitle((prev) => ({
        ...prev,
        status: {
          loading: true,
        },
      }));
      const response = await AnilibriaApi.getUpdates(1);
      setTitle(response.data);
    } catch (error) {
      console.error("Ошибка", error);
    } finally {
      setTitle((prev) => ({
        ...prev,
        status: {
          loading: false,
        },
      }));
    }
  };

  useEffect(() => {
    fetchTitleList();
  }, []);

  return (
    <>
      <div className={styles.banner}>
        <img className={styles.banner_img} src="https://wallpapercave.com/wp/wp13268605.png" alt="" />
        <div className={styles.banner_bg}></div>
        <div className={styles.banner_text_container}>
          <h2>Провожающая в последний путь Фрирен</h2>
          <p>
            Одержав победу над Королём демонов, отряд героя Химмеля вернулся домой. Приключение, растянувшееся на
            десятилетие, подошло к завершению.
          </p>
          <div className={styles.btns}>
            <button className="btn" onClick={() => navigate("/anime-details/9542")}>
              <PlayIcon />
              Смотреть
            </button>
            <button className="btn black" onClick={() => navigate("/anime-details/9542")}>
              Подробнее
            </button>
          </div>
        </div>
      </div>

      {title.status.loading ? (
        <Swiper
          freeMode
          className={styles.skeletons}
          spaceBetween={20}
          slidesPerView={5}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 2.1,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          <SwiperSlide className={styles.swiper_slide}>
            <Skeleton className={styles.skeletons_updates} animation="wave" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <Skeleton className={styles.skeletons_updates} animation="wave" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <Skeleton className={styles.skeletons_updates} animation="wave" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <Skeleton className={styles.skeletons_updates} animation="wave" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiper_slide}>
            <Skeleton className={styles.skeletons_updates} animation="wave" />
          </SwiperSlide>
        </Swiper>
      ) : (
        <div className={styles.content}>
          <h2>Недавно обновленные </h2>
          <Swiper
            freeMode
            className={styles.swiper}
            spaceBetween={20}
            slidesPerView={5}
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.1,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 2.1,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {title.list.map((e: any) => (
              <SwiperSlide className={styles.swiper_slide}>
                <Card
                  title={e.names.ru}
                  img={e.posters.original.url}
                  desc={e.description}
                  onClick={() => navigate(`/anime-details/${e.id}`)}
                />
              </SwiperSlide>
            ))}
            <div className={`${styles.swiper_prev} custom-prev`}>
              <ArrowLeftIcon />
            </div>
            <div className={`${styles.swiper_next} custom-next`}>
              <ArrowLeftIcon />
            </div>
          </Swiper>
        </div>
      )}
    </>
  );
};
