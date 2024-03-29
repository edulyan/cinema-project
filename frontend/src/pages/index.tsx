import Home from "@/components/screens/home/Home";
import { IGetMoviesRes } from "@/models/movie";
import { MovieService } from "@/services/movie.service";
import { GetStaticProps, NextPage } from "next";

const HomePage: NextPage<IGetMoviesRes> = ({ movies, length }) => {
  return <Home movies={movies} length={length} />;
};

export const getStaticProps: GetStaticProps<IGetMoviesRes> = async () => {
  try {
    const data = await MovieService.getAll({ orderBy: "DESC", take: "5" });

    return {
      props: {
        movies: data.movies,
        length: data.length,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        movies: [],
        length: 0,
      },
    };
  }
};

export default HomePage;
