import { useNavigate, useParams } from "react-router-dom";
import styles from "./AnimeDetails.module.sass";
import { useEffect, useState } from "react";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import ReactPlayer from "react-player";
import { Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Navigation } from "swiper/modules";
import { TitleDetailT } from "@/shared/types";
import { Episode, FracnhisesT } from "@/shared/types/TitleT";
import { ArrowLeftIcon } from "@/shared/ui/icons";

export const AnimeDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<TitleDetailT>({
    data: null,
    status: { loading: false },
  });
  const [ep, setEp] = useState({
    episode: "",
    preview: "",
  });
  const [franchises, setFranchises] = useState<FracnhisesT[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setData((prev) => ({
        ...prev,
        status: {
          loading: true,
        },
      }));
      const resp = await AnilibriaApi.getTitle(id);
      if (resp.data) {
        setData((prev) => ({
          ...prev,
          data: resp.data,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setData((prev) => ({
        ...prev,
        status: {
          loading: false,
        },
      }));
    }
  };

  const fetchFracnchises = async () => {
    try {
      const resp = await AnilibriaApi.getFranchises(id);
      setFranchises(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFracnchises();
  }, [id]);

  const handleEpisode = (ep: string, preview: string, idx: number) => {
    setActiveIndex(idx);
    return setEp({
      episode: `${ep}`,
      preview: `https://www.anilibria.tv${preview}`,
    });
  };

  useEffect(() => {
    setEp({
      episode: `${data.data?.episodes[0]?.hls_1080 || data.data?.episodes[0]?.hls_720}`,
      preview: `https://www.anilibria.tv${data.data?.episodes[0]?.preview.optimized.src}`,
    });
  }, [data.data?.episodes]);

  return (
    <div className={styles.content}>
      <div className={styles.bg}>
        <img src="/bg.jpg" alt="" />
      </div>

      {data.status?.loading ? (
        <>
          <Skeleton variant="text" width="60%" height={40} className={styles.skeletonTitle} />

          <div className={styles.info}>
            <Skeleton variant="rectangular" width={450} height={640} className={styles.skeletonPoster} />

            <div className={styles.details}>
              <Skeleton variant="text" width="80%" height={50} />
              <Skeleton variant="text" width="60%" height={30} />

              <div className={styles.details_genres}>
                {[...Array(5)].map((_, idx) => (
                  <Skeleton key={idx} variant="rectangular" width={80} height={30} className={styles.skeletonGenre} />
                ))}
              </div>

              <div className={styles.items}>
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className={styles.item}>
                    <Skeleton variant="text" width={150} height={25} />
                    <Skeleton variant="text" width="60%" height={25} />
                  </div>
                ))}
              </div>

              <div className={styles.desc}>
                <Skeleton variant="text" width={120} height={40} />
                {[...Array(4)].map((_, idx) => (
                  <Skeleton key={idx} variant="text" width="100%" height={20} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.player}>
            <Skeleton variant="rectangular" width="60%" height={500} className={styles.skeletonPlayer} />

            <div className={styles.episodes}>
              {[...Array(8)].map((_, idx) => (
                <Skeleton key={idx} variant="rectangular" width="100%" height={50} className={styles.skeletonEpisode} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title_top}>{data.data?.name.main}</div>

          <div className={styles.info}>
            <img className={styles.image} src={`https://www.anilibria.tv${data.data?.poster.optimized.src}`} alt="" />
            <div className={styles.details}>
              <h2 className={styles.details_title}>{data.data?.name.main}</h2>
              <p className={styles.details_title_en}>{data.data?.name.english}</p>

              <div className={styles.details_genres}>
                {data.data?.genres.map((e, idx) => (
                  <div key={idx} className={styles.details_genres_item}>
                    {e.name}
                  </div>
                ))}
              </div>

              <div className={styles.items}>
                <div className={styles.item}>
                  <div className={styles.item_title}>Сезон года:</div>
                  <div className={styles.item_text}>
                    {data.data?.season.description} {data.data?.year}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Статус:</div>
                  {/* <div className={styles.item_text}>{data.data.status.string}</div> */}
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Тип:</div>
                  <div className={styles.item_text}>{data.data?.type.value}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Озвучка:</div>
                  {/* <div className={styles.voice_items}>
                    {data.team.voice.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div> */}
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Тайминг:</div>
                  {/* <div className={styles.voice_items}>
                    {data.team.timing.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div> */}
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Субтитры:</div>
                  {/* <div className={styles.voice_items}>
                    {data.team.translator.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div> */}
                </div>
              </div>

              <div className={styles.desc}>
                <h2 className={styles.desc_title}>Описание:</h2>
                <p>{data.data?.description}</p>
              </div>
            </div>
          </div>

          <div className={styles.player}>
            <div className={styles.video}>
              <ReactPlayer
                key={ep.episode}
                width={"100%"}
                height={"100%"}
                controls
                light={ep.preview}
                pip
                url={ep.episode}
              />
            </div>
            <div className={styles.episodes}>
              {data.data?.episodes.map((ep: Episode, idx) => (
                <p
                  key={idx}
                  onClick={() => handleEpisode(ep.hls_1080 || ep.hls_720, ep.preview.optimized.src, idx)}
                  className={activeIndex === idx ? styles.active : ""}
                >
                  Эпизод {ep.ordinal} {ep.name}
                </p>
              ))}
            </div>
          </div>

          {franchises?.length > 0 ? (
            <div className={styles.others}>
              <h2 className={styles.others_title}>Порядок просмотра</h2>
              <Swiper
                freeMode
                spaceBetween={20}
                slidesPerView={5}
                modules={[Navigation]}
                className={styles.others_items}
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
                {franchises?.map((e) =>
                  e.franchise_releases.map((e) => {
                    return (
                      <SwiperSlide
                        className={`${styles.others_item} ${id === e.id.toString() ? styles.active : ""}`}
                        key={e.id}
                        onClick={() => navigate(`/anime-details/${e.release_id}`)}
                      >
                        <img src={`https://www.anilibria.tv${e.release.poster.optimized.src}` || ""} alt="" />
                        <p>{e.release.name.main}</p>
                      </SwiperSlide>
                    );
                  })
                )}
                <div className={`${styles.swiper_prev} custom-prev`}>
                  <ArrowLeftIcon />
                </div>
                <div className={`${styles.swiper_next} custom-next`}>
                  <ArrowLeftIcon />
                </div>
              </Swiper>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};
