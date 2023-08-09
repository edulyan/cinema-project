import CinemasList from "@/components/screens/cinemasList/CinemasList";
import { ICinemaListPage } from "@/models/cinema";
import { CinemaService } from "@/services/cinema.service";
import { GetStaticProps, NextPage } from "next";

const CinemasListPage: NextPage<ICinemaListPage> = ({ cinemas }) => {
  return <CinemasList cinemas={cinemas} />;
};

export const getStaticProps: GetStaticProps<ICinemaListPage> = async () => {
  try {
    const data = await CinemaService.getAll();

    return {
      props: {
        cinemas: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        cinemas: [],
      },
    };
  }
};

export default CinemasListPage;
