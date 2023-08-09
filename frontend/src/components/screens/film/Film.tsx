import { FC, forwardRef, useState } from "react";
import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { IGetMovieRes } from "@/models/movie";
import Layout from "@/components/layout/Layout";
import { MovieService } from "@/services/movie.service";
import ScheduleCard from "@/ui/scheduleCard/ScheduleCard";

import styles from "./Film.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { dateChange } from "@/ui/scheduleCard/helper";

type Ref = HTMLButtonElement;
type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const Film: FC<IGetMovieRes> = ({ movie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(String(date));
  };

  const ScheduleInput = forwardRef<Ref, ButtonProps>((props, ref) => (
    <button
      type="button"
      ref={ref}
      className={styles.schedule_input}
      onClick={props.onClick}
    >
      {props.value}
      <GoTriangleDown className={styles.triangle_icon} size={30} />
    </button>
  ));

  const { data: response } = useQuery(
    ["schedule", movie.id, selectedDate],
    () =>
      MovieService.getMovieSchedulesByDate(movie.id, new Date(selectedDate)),
    {
      initialData: [],
      keepPreviousData: true,
    }
  );

  return (
    <div className={styles.main}>
      <Layout />

      <div className={styles.main_block}>
        <div className={styles.bg_trailer}>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            src={"http://localhost:3033/" + movie.trailer}
            width={800}
            height={350}
            placeholder="blur"
            className={styles.trailer}
          />
          <div className={styles.shadow}></div>
        </div>

        <div className={styles.movie_info}>
          <div className={styles.movie_img_div}>
            <Image
              src={"http://localhost:3033/" + movie.imgVert}
              width={289}
              height={500}
              alt="movie-vert"
              placeholder="blur"
              blurDataURL={"/images-test/loading.gif"}
              className={styles.movie_img}
              key={movie.imgVert}
            />
          </div>

          <div className={styles.div_none}></div>

          <div className={styles.movie_info_main}>
            <h1 className={styles.title_year}>
              {movie.title} ({movie.year})
            </h1>

            <h5 className={styles.ageRating}>{movie.ageRating}</h5>

            <h3 className={styles.description}>{movie.description}</h3>

            <div className={styles.toTrailer}>
              <Button className={styles.btnToTrailer} onClick={onOpen}>
                <BsPlayFill className={styles.play_btn} />
                <h3 className={styles.title}>Смотреть трейлер</h3>
              </Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={"5xl"} isCentered>
              <ModalOverlay />
              <ModalContent className={styles.modal_trailer}>
                {/* <ModalCloseButton /> */}
                <video
                  src={"http://localhost:3033/" + movie.trailer}
                  controls
                  autoPlay
                />{" "}
              </ModalContent>
            </Modal>

            <div className={styles.movie_about}>
              <h2 className={styles.about}>О Фильме</h2>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Год производства</div>
                <div className={styles.right}>{movie.year}</div>
              </div>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Страна</div>
                <div className={styles.right}>{movie.countries.join(", ")}</div>
              </div>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Жанр</div>
                <div className={styles.right}>{movie.genre.join(", ")}</div>
              </div>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Режиссер</div>
                <div className={styles.right}>{movie.director}</div>
              </div>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Возраст</div>
                <div className={styles.right}>{movie.ageRating}</div>
              </div>

              <div className={styles.movie_flex}>
                <div className={styles.left}>Время</div>
                <div className={styles.right}>
                  {dateChange(movie.duration)} / {movie.duration} мин.
                </div>
              </div>
            </div>
          </div>

          <div className={styles.movie_actors}>
            <h2 className={styles.title}>В главных ролях:</h2>
            <ul className={styles.actors_list}>
              {movie.actors.map((actor: string) => {
                return <li key={actor}>{actor}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className={styles.schedule}>
          <div className={styles.date}>
            <h1 className={styles.schedule_title}>Расписание</h1>
            <DatePicker
              closeOnScroll={true}
              selected={new Date(selectedDate)}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              // minDate={new Date()}
              maxDate={addDays(new Date(), 7)}
              placeholderText="Сегодня"
              customInput={<ScheduleInput />}
            />
          </div>

          <div className={styles.line}></div>

          <ScheduleCard schedule={response} component={"film"} />
        </div>
      </div>
    </div>
  );
};

export default Film;
