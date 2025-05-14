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

export const AnimeDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    posters: {
      original: {
        url: "",
      },
    },
    names: {
      alternative: "",
      en: "",
      ru: "",
    },
    genres: [],
    season: {
      string: "",
      year: 0,
    },
    status: {
      string: "",
    },
    type: {
      episodes: 0,
      full_string: "",
      string: "",
    },
    team: {
      voice: [],
      timing: [],
      translator: [],
    },
    description: "",
    player: {
      list: [
        {
          episode: 0,
          name: "",
          preview: "",
          hls: {
            fhd: "",
            hd: "",
            sd: "",
          },
        },
      ],
    },
    statuses: {
      laoding: false,
    },
    franchises: [
      {
        releases: [
          {
            id: 0,
            names: {
              ru: "",
            },
          },
        ],
      },
    ],
  });
  const [ep, setEp] = useState({
    episode: "",
    preview: "",
  });
  const [image, setImage] = useState([
    {
      id: 0,
      url: "",
    },
  ]);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setData((prev) => ({
        ...prev,
        statuses: {
          laoding: true,
        },
      }));
      const resp = await AnilibriaApi.getTitle(id);
      if (resp.data) setData(resp.data);
    } catch (err) {
      console.error(err);
    } finally {
      setData((prev) => ({
        ...prev,
        statuses: {
          laoding: false,
        },
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEpisode = (ep: string, preview: string, idx: number) => {
    setActiveIndex(idx);
    return setEp({
      episode: `https://cache.libria.fun${ep}`,
      preview: `https://www.anilibria.tv${preview}`,
    });
  };

  const getImage = async (id: number) => {
    try {
      const resp = await AnilibriaApi.getTitle(id);
      const url = resp.data.posters.original.url;

      setImage((prev) => {
        const updatedImages = [...prev];

        const existingImage = updatedImages.find((img) => img.id === id);
        if (existingImage) {
          existingImage.url = url;
        } else {
          updatedImages.push({ id, url });
        }

        return updatedImages;
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setEp({
      episode: `https://cache.libria.fun${data.player.list[1]?.hls.fhd}`,
      preview: `https://www.anilibria.tv${data.player.list[1]?.preview}`,
    });
  }, [data.player.list]);

  useEffect(() => {
    data.franchises.forEach((f: any) => {
      f.releases.forEach((e: any) => {
        getImage(e.id);
      });
    });
  }, [data.franchises]);

  return (
    <div className={styles.content}>
      <div className={styles.bg}>
        <img src="/details_bg_2.jpg" alt="" />
      </div>

      {data.statuses.laoding ? (
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
          <div className={styles.title_top}>{data.names.ru}</div>

          <div className={styles.info}>
            <img className={styles.image} src={`https://www.anilibria.tv${data.posters.original.url}`} alt="" />
            <div className={styles.details}>
              <h2 className={styles.details_title}>{data.names.ru}</h2>
              <p className={styles.details_title_en}>{data.names.en}</p>

              <div className={styles.details_genres}>
                {data.genres.map((e, idx) => (
                  <div key={idx} className={styles.details_genres_item}>
                    {e}
                  </div>
                ))}
              </div>

              <div className={styles.items}>
                <div className={styles.item}>
                  <div className={styles.item_title}>Сезон года:</div>
                  <div className={styles.item_text}>
                    {data.season.string} {data.season.year}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Статус:</div>
                  <div className={styles.item_text}>{data.status.string}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Тип:</div>
                  <div className={styles.item_text}>{data.type.full_string}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Озвучка:</div>
                  <div className={styles.voice_items}>
                    {data.team.voice.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Тайминг:</div>
                  <div className={styles.voice_items}>
                    {data.team.timing.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.item}>
                  <div className={styles.item_title}>Субтитры:</div>
                  <div className={styles.voice_items}>
                    {data.team.translator.map((e: any, idx) => (
                      <div key={idx} className={styles.item_text}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.desc}>
                <h2 className={styles.desc_title}>Описание:</h2>
                <p>{data.description}</p>
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
              {Object.values(data.player.list).map((ep: any, idx) => (
                <p
                  key={idx}
                  onClick={() => handleEpisode(ep.hls.fhd, ep.preview, idx)}
                  className={activeIndex === idx ? styles.active : ""}
                >
                  Эпизод {ep.episode} {ep.name}
                </p>
              ))}
            </div>
          </div>

          {data.franchises.length > 0 ? (
            <div className={styles.others}>
              <h2 className={styles.others_title}>Порядок просмотра</h2>
              <Swiper
                freeMode
                spaceBetween={20}
                slidesPerView={5}
                modules={[Navigation]}
                className={styles.others_items}
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
                {data.franchises.map((e: any) =>
                  e.releases.map((e: any) => {
                    const imageObj = image.find((img) => img.id === e.id);
                    return (
                      <SwiperSlide
                        className={`${styles.others_item} ${id === e.id.toString() ? styles.active : ""}`}
                        key={e.id}
                        onClick={() => navigate(`/anime-details/${e.id}`)}
                      >
                        <img src={`https://www.anilibria.tv${imageObj?.url}` || ""} alt="" />
                        <p>{e.names.ru}</p>
                      </SwiperSlide>
                    );
                  })
                )}
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
