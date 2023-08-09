import { GetStaticProps, NextPage } from "next";
import KinoAfisha from "@/components/screens/kinoafisha/Kinoafisha";
import { IGetMoviesRes } from "@/models/movie";
import { MovieService } from "@/services/movie.service";

const KinoAfishaPage: NextPage<IGetMoviesRes> = ({ movies, length }) => {
  return <KinoAfisha movies={movies} />;
};

export const getStaticProps: GetStaticProps<IGetMoviesRes> = async () => {
  try {
    const data = await MovieService.getAll({ orderBy: null, take: "0" });

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

export default KinoAfishaPage;
