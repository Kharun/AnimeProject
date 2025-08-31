import { useEffect, useState } from "react";
import styles from "./Schedule.module.sass";
import { AnilibriaApi } from "@/shared/api/services/AnilibriaService";
import { ScheduleT } from "@/shared/types";

export const Schedule = () => {
  const [data, setData] = useState<ScheduleT[]>();
  //   const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await AnilibriaApi.getSchedule();
        if (resp.data) {
          setData(resp.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const showDay = (idx: number) => {
    const days = ["Понидельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    return days[idx];
  };

  return (
    <>
      <div className={styles.content}>
        <h2 className={styles.title}>Расписание выхода новых эпизодов</h2>

        <div className={styles.days}>
          {data?.map((e: any) => (
            <div className={`${styles.days_item}`} key={e.day}>
              {showDay(e.day)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
