import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IGetMovieRes, IMovieParam } from "@/models/movie";
import { MovieService } from "@/services/movie.service";
import Film from "@/components/screens/film/Film";

const FilmPage: NextPage<IGetMovieRes> = ({ movie }) => {
  return <Film movie={movie} />;
};

export const getStaticPaths: GetStaticPaths<IMovieParam> = async () => {
  const data = await MovieService.getAll({ orderBy: "DESC", take: "0" });

  return {
    paths: data.movies.map((movie) => ({
      params: {
        slug: movie.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IGetMovieRes> = async ({
  params,
}) => {
  const movie = await MovieService.getBySlug(String(params?.slug));

  return {
    props: {
      movie: movie,
    },
    revalidate: 60,
  };
};

export default FilmPage;
