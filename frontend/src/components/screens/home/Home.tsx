import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { RxTriangleUp, RxTriangleRight } from "react-icons/rx";
import { Button, IconButton } from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import styles from "./Home.module.scss";
import { IGetMoviesRes } from "@/models/movie";

const Home: FC<IGetMoviesRes> = ({ movies, length }) => {
  const [currentMovie, setCurrentMovie] = useState(0);

  const prevMovie = () => {
    setCurrentMovie(currentMovie === 0 ? length! - 1 : currentMovie - 1);
  };

  const nextMovie = () => {
    setCurrentMovie(currentMovie === length! - 1 ? 0 : currentMovie + 1);
  };

  return (
    <div className={styles.home_main}>
      <Layout />

      <Image
        src={"http://localhost:3033/" + movies[currentMovie].image}
        width={1920}
        height={1080}
        alt="FIT-ARM"
        priority
        className={styles.img}
      />

      <div className={styles.containers}>
        <div className={styles.fir_row}>
          <div className={styles.slider_count}>
            <h5 className={styles.current_numb}>{currentMovie + 1}</h5>
            <h5 className={styles.slash}>/</h5>
            <h5 className={styles.amount_numb}>{length}</h5>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{movies[currentMovie].title}</h1>

            <div className={styles.details_flex}>
              <div className={styles.director}>
                <h6>{movies[currentMovie].director}</h6>
              </div>

              <div className={styles.year}>
                <h6>{movies[currentMovie].year}</h6>
              </div>

              <div className={styles.duration}>
                <h6>{movies[currentMovie].duration} мин</h6>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sec_row}>
          <div className={styles.slider}>
            <IconButton
              variant="outline"
              aria-label="Prev"
              icon={<HiArrowLeft />}
              className={styles.prev}
              onClick={prevMovie}
            />
            <IconButton
              variant="outline"
              aria-label="Next"
              icon={<HiArrowRight />}
              className={styles.next}
              onClick={nextMovie}
            />
          </div>
          <div className={styles.trailer}>
            <div className={styles.trailer_div}>
              <div className={styles.up_icon}>
                <RxTriangleUp />
              </div>
              <div className={styles.trailer_title}>
                <h6>Трейлер</h6>
              </div>
            </div>
            <div className={styles.trailer_btn}>
              <RxTriangleRight className={styles.play_btn} />
            </div>
          </div>
          <div className={styles.actors}>
            <div className={styles.actors_div}>
              <div className={styles.up_icon}>
                <RxTriangleUp />
              </div>
              <div className={styles.actors_title}>
                <h6>Актеры</h6>
              </div>
            </div>
            <div className={styles.actors_circles}>
              {movies[currentMovie].actors.map((name, index, array) => {
                if (index === 3) {
                  return (
                    <div className={styles.circles}>
                      <h6 className={styles.number}>+{array.length - 3}</h6>
                    </div>
                  );
                }
                if (index >= 3) {
                  return;
                }
                return (
                  <div className={styles.circles}>
                    <h6 className={styles.letter}>{name[0]}</h6>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.toMovie}>
            <Link href={`film/${movies[currentMovie].slug}`}>
              <Button variant="outline" className={styles.btnToBuy}>
                Купить Билет
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
