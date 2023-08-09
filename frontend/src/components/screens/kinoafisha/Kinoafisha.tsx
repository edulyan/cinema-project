import { FC } from "react";
import Image from "next/image";
import { Button } from "@chakra-ui/react";
import { IGetMoviesRes, IMovie } from "@/models/movie";
import styles from "./Kinoafisha.module.scss";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

const KinoAfisha: FC<IGetMoviesRes> = ({ movies, length }) => {
  return (
    <div className={styles.main}>
      <Layout />

      <div className={styles.main_block}>
        <div className={styles.main_title}>
          <h1>Сейчас в кино</h1>
        </div>

        <div className={styles.moviesList}>
          {movies.map((movie: IMovie) => {
            return (
              <div className={styles.movie_div} key={movie.id}>
                <div className={styles.img_div}>
                  <Link href={`/film/${movie.slug}`} key={movie.slug}>
                    <Button height="100px" width="100px" className={styles.btn}>
                      <Image
                        src={"http://localhost:3033/" + movie?.imgVert}
                        width={289}
                        height={500}
                        alt="movie-vert"
                        placeholder="blur"
                        blurDataURL={"/images-test/loading.gif"}
                        className={styles.img}
                        key={movie.imgVert}
                      />
                    </Button>
                  </Link>
                </div>
                <div className={styles.movie_info}>
                  <h5 className={styles.ageRating}>{movie.ageRating}</h5>
                  <h1 className={styles.movie_title}>{movie.title}</h1>
                  <div className={styles.line} />
                  <h5 className={styles.genre}>{movie.genre.join(", ")}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KinoAfisha;
