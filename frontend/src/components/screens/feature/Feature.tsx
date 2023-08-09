import { FC, useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Select,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import { IMovie } from "@/models/movie";

import styles from "./Feature.module.scss";
import { useMutation } from "@tanstack/react-query";
import { VoteService } from "@/services/vote.service";

const Feature: FC<{
  movies: IMovie[];
}> = ({ movies }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mutation = useMutation((movieId: string) => {
    return VoteService.makeVote({ movieId });
  });

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now: any = new Date();
      const target: any = getNextFriday();
      const diff = target - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getNextFriday = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = 5 - dayOfWeek;

    const nextFriday = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
    nextFriday.setHours(23, 50, 0, 0);

    return nextFriday;
  };

  const formatTimeUnit = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };

  const { days, hours, minutes, seconds } = countdown;

  return (
    <div className={styles.main}>
      <Layout />

      <div className={styles.main_block}>
        <div className={styles.timer}>
          <h2>До окончания голосования осталось:</h2>
          <div className={styles.countdown}>
            <div className={styles.timeUnit}>
              {formatTimeUnit(days)} <h1 className={styles.timeLabel}>Дней</h1>
            </div>
            <div className={styles.timeUnit}>
              {formatTimeUnit(hours)}{" "}
              <h1 className={styles.timeLabel}>Часов</h1>
            </div>
            <div className={styles.timeUnit}>
              {formatTimeUnit(minutes)}{" "}
              <h1 className={styles.timeLabel}>Минут</h1>
            </div>
            <div className={styles.timeUnit}>
              {formatTimeUnit(seconds)}{" "}
              <h1 className={styles.timeLabel}>Секунд</h1>
            </div>
          </div>
        </div>

        <h1 className={styles.main_title}>Лидеры на этой неделе</h1>

        <div className={styles.popular}>
          {movies.slice(0, 2).map((movie: IMovie) => {
            return (
              <div className={styles.popular_div}>
                <>
                  <Image
                    src={"http://localhost:3033/" + movie.imgVert}
                    width={160}
                    height={360}
                    alt="movie-vert"
                    placeholder="blur"
                    blurDataURL={"/images-test/loading.gif"}
                    className={styles.movie_img}
                    key={movie.imgVert}
                  />
                  <div className={styles.movie_info}>
                    <h1 className={styles.movie_title}>{movie.title}</h1>
                    <div className={styles.line} />
                    <div className={styles.votes}>
                      Проголосовало -{" "}
                      {!movie.votes?.length ? 0 : movie.votes?.length}
                    </div>
                  </div>
                </>
              </div>
            );
          })}
        </div>

        <div className={styles.line}></div>

        <div className={styles.movies_list}>
          {movies.slice(0, movies.length).map((movie: IMovie) => {
            return (
              <div className={styles.movie_div}>
                <>
                  <Image
                    src={"http://localhost:3033/" + movie.imgVert}
                    width={160}
                    height={360}
                    alt="movie-vert"
                    placeholder="blur"
                    blurDataURL={"/images-test/loading.gif"}
                    className={styles.movie_img}
                    key={movie.imgVert}
                  />

                  <div className={styles.movie_info}>
                    <h1 className={styles.movie_title}>{movie.title}</h1>
                    <div className={styles.line} />
                    <div className={styles.votes}>
                      Проголосовало -{" "}
                      {!movie.votes?.length ? 0 : movie.votes?.length}
                    </div>
                    <div className={styles.toVote}>
                      <Button
                        className={styles.btnToVote}
                        onClick={() => mutation.mutate(movie.id)}
                      >
                        <h3 className={styles.title}>Проголосовать</h3>
                      </Button>
                    </div>
                    <div className={styles.toBuyAll}>
                      <Button className={styles.btnToBuyAll} onClick={onOpen}>
                        <h3 className={styles.title}>Выкупить сеанс</h3>
                      </Button>
                    </div>
                  </div>

                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    size={"3xl"}
                    isCentered
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <div className={styles.modal}>
                        <div className={styles.modal_header}>
                          <div className={styles.top_header}>
                            <h2 className={styles.title}>{movie?.title} </h2>
                            <h2 className={styles.ageRating}>
                              {movie?.ageRating}
                            </h2>
                          </div>
                        </div>
                        <div className={styles.line_top}></div>

                        <div className={styles.middle_div}>
                          <Image
                            src={"http://localhost:3033/" + movie.imgVert}
                            width={130}
                            height={330}
                            alt="movie-vert"
                            placeholder="blur"
                            blurDataURL={"/images-test/loading.gif"}
                            className={styles.movie_modal_img}
                            key={movie.imgVert}
                          />

                          <div className={styles.selects_list}>
                            <div className={styles.selects}>
                              <Select
                                variant="filled"
                                placeholder="Выберите кинотеатр"
                              ></Select>
                            </div>
                            <div className={styles.selects}>
                              <Select
                                variant="filled"
                                placeholder="Выберите дату"
                              ></Select>
                            </div>
                            <div className={styles.selects}>
                              <Select
                                variant="filled"
                                placeholder="Выберите время"
                              ></Select>
                            </div>
                          </div>
                        </div>

                        <div className={styles.line_top}></div>

                        <div className={styles.bottom_div}>
                          <Button
                            isDisabled={true}
                            className={styles.btn_disabled}
                          >
                            Далее
                          </Button>
                        </div>
                      </div>
                    </ModalContent>
                  </Modal>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feature;
