import { TitleItem } from "./TitleT";

export interface ScheduleItem {
  full_season_is_released: boolean;
  next_release_episode_number: number;
  release: TitleItem;
}

export interface ScheduleT {
  list: ScheduleItem[];
  status?: {
    laoding: boolean;
  };
}
