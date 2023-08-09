import axios from "axios";
import { IGetMoviesRes, IGetMoviesReq, IMovie } from "@/models/movie";
import { ISchedule } from "@/models/schedule";

const MOVIE_PORT = "http://localhost:3033/movie";

export const MovieService = {
  async getAll(dto?: IGetMoviesReq) {
    const { data } = await axios.get<IGetMoviesRes>(
      `${MOVIE_PORT}?orderBy=${dto?.orderBy}&take=${dto?.take}`
    );

    return data;
  },

  async getFeatureMovies() {
    const { data } = await axios.get<IMovie[]>(`${MOVIE_PORT}/featureMovies`);

    return data;
  },

  async getBySlug(slug: string) {
    const { data } = await axios.get<IMovie>(`${MOVIE_PORT}/bySlug/${slug}`);

    return data;
  },

  async getMovieSchedulesByDate(id: string, date: Date) {
    const { data } = await axios.get<ISchedule[]>(
      `${MOVIE_PORT}/schedules/${id}?date=${date}`
    );

    return data;
  },
};
