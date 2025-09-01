import { useEffect, useState } from "react";
import styles from "./Schedule.module.sass";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import { ScheduleT } from "@/shared/types";
import { Card } from "@/shared/ui/card";
import { ScheduleItem } from "@/shared/types/ScheduleT";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export const Schedule = () => {
  const [data, setData] = useState<ScheduleT>({
    list: [],
  });
  const [titleList, setTitleList] = useState([
    {
      title: "Понедельник",
      list: [],
      show: true,
    },
    {
      title: "Вторник",
      list: [],
      show: true,
    },
    {
      title: "Среда",
      list: [],
      show: true,
    },
    {
      title: "Четверг",
      list: [],
      show: true,
    },
    {
      title: "Пятница",
      list: [],
      show: true,
    },
    {
      title: "Суббота",
      list: [],
      show: true,
    },
    {
      title: "Воскресенье",
      list: [],
      show: true,
    },
  ]);
  const [activeDay, setActiveDay] = useState("Все");

  const today = new Date().toLocaleDateString("ru-RU", { weekday: "long" });
  const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
  const navigate = useNavigate();

  const showDay = (val: string) => {
    setActiveDay(val);
    setTitleList((prev: any) =>
      prev.map((day: any) => ({
        ...day,
        show: val === "Все" ? true : day.title === val,
      }))
    );
  };
  const showActiveDay = (val: string) => {
    const value = val.toLowerCase();
    return value === today;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, status: { laoding: true } }));
        const resp = await AnilibriaApi.getSchedule();
        if (resp.data) {
          setData({ list: resp.data, status: { laoding: false } });
        }
      } catch (err) {
        console.error(err);
        setData((prev) => ({ ...prev, status: { laoding: false } }));
      } finally {
        setData((prev) => ({ ...prev, status: { laoding: false } }));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    setTitleList((prev: any) =>
      prev.map((day: any) => ({
        ...day,
        list: data.list.filter((item) => item.release.publish_day.description === day.title),
      }))
    );
  }, [data]);

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Расписание выхода новых эпизодов</h2>

        <div className={styles.days_wrapper}>
          <div className={styles.days}>
            <div
              className={`${styles.days_item} ${activeDay === "Все" ? styles.active : ""}`}
              onClick={() => {
                setActiveDay("Все");
                showDay("Все");
              }}
            >
              Все
            </div>
            {days.map((e: string, idx: number) => (
              <div
                className={`${styles.days_item} ${showActiveDay(e) ? styles.current : ""} ${
                  activeDay === e ? styles.active : ""
                }`}
                key={idx}
                onClick={() => showDay(e)}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        {!data.status?.laoding && data.list.length > 0 ? (
          <div className={styles.wrapper}>
            <motion.div layout>
              <AnimatePresence>
                {titleList.map(
                  (item) =>
                    item.show && (
                      <motion.div
                        className={styles.item}
                        key={item.title}
                        initial={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className={styles.item_title}>{item.title}</h2>
                        <p className={styles.item_count}>{item.list.length} релизов</p>
                        <div className={styles.list}>
                          {item.list.map((title: ScheduleItem) => (
                            <Card
                              customClass={styles.card}
                              key={title.release.id}
                              title={title.release.name.main}
                              img={title.release.poster.optimized.src}
                              desc={title.release.description}
                              onClick={() => navigate(`/anime-details/${title.release.id}`)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <div className={styles.skeleton}>
            <div className={styles.skeleton_item}>
              <Skeleton width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
            <div className={styles.skeleton_item}>
              <Skeleton width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
            <div className={styles.skeleton_item}>
              <Skeleton width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
