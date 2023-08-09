import { CinemaSlug, ICinema } from "@/models/cinema";
import { ISchedule } from "@/models/schedule";
import axios from "axios";

const CINEMA_PORT = "http://localhost:3033/cinema";

export const CinemaService = {
  async getAll() {
    const { data } = await axios.get<ICinema[]>(`${CINEMA_PORT}`);

    return data;
  },

  async getBySlug(slug: CinemaSlug) {
    const { data } = await axios.get<ICinema>(`${CINEMA_PORT}/bySlug/${slug}`);

    return data;
  },

  async getMovieSchedulesByDate(id: string, date: Date) {
    const { data } = await axios.get<ISchedule[]>(
      `${CINEMA_PORT}/schedules/${id}?date=${date}`
    );

    return data;
  },
};
