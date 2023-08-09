import { FC } from "react";
import Image from "next/image";
import { BiMap } from "react-icons/bi";
import { SiMoscowmetro } from "react-icons/si";
import Layout from "@/components/layout/Layout";
import { ICinema, ICinemaListPage } from "@/models/cinema";

import styles from "./CinemaList.module.scss";
import Link from "next/link";

const CinemasList: FC<ICinemaListPage> = ({ cinemas }) => {
  return (
    <div className={styles.cinemaList_main}>
      <Layout />

      <Image
        src="/images-test/cinema_list.webp"
        width={1920}
        height={1080}
        alt="CINEMA-LIST"
        priority
        className={styles.img}
      />

      <div className={styles.cinema_list}>
        {cinemas.map((cinema: ICinema) => {
          return (
            <Link href={`/cinema/${cinema.slug}`} key={cinema.slug}>
              <div className={styles.cinema_div}>
                <div className={styles.cinema_name}>{cinema.name}</div>

                <div className={styles.cinema_address}>
                  <BiMap className={styles.address_icon} />
                  <h3 className={styles.address}>{cinema.address}</h3>
                </div>

                <div className={styles.cinema_subway}>
                  <SiMoscowmetro className={styles.subway_icon} />
                  <h3 className={styles.subway}>{cinema.subway}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CinemasList;
