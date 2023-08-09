import Cinema from "@/components/screens/cinema/Cinema";
import { CinemaSlug, ICinemaParam, IGetCinemaRes } from "@/models/cinema";
import { CinemaService } from "@/services/cinema.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

const CinemaPage: NextPage<IGetCinemaRes> = ({ cinema }) => {
  return <Cinema cinema={cinema} />;
};

export const getStaticPaths: GetStaticPaths<ICinemaParam> = async () => {
  const data = await CinemaService.getAll();

  return {
    paths: data.map((cinema) => ({
      params: {
        slug: cinema.slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IGetCinemaRes> = async ({
  params,
}) => {
  const cinema = await CinemaService.getBySlug(
    String(params?.slug) as CinemaSlug
  );

  return {
    props: {
      cinema: cinema,
    },
    revalidate: 60,
  };
};

export default CinemaPage;
