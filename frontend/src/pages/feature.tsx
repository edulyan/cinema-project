import Feature from "@/components/screens/feature/Feature";
import { IGetMoviesRes, IMovie } from "@/models/movie";
import { MovieService } from "@/services/movie.service";
import { GetStaticProps, NextPage } from "next";

const FeaturePage: NextPage<{
  movies: IMovie[];
}> = ({ movies }) => {
  return <Feature movies={movies} />;
};

export const getStaticProps: GetStaticProps<{
  movies: IMovie[];
}> = async () => {
  try {
    const data = await MovieService.getFeatureMovies();

    return {
      props: {
        movies: data,
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

export default FeaturePage;
