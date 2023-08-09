import { FC, PropsWithChildren, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import Image from "next/image";
import { ISchedule } from "@/models/schedule";
import { IRoomSeat, ISession } from "@/models/session";

import styles from "./ScheduleCard.module.scss";
import { getDayMonth, getTime } from "@/helpers/getTime";
import { useMutation } from "@tanstack/react-query";
import { TicketService } from "@/services/ticket.service";
import { dateChange } from "./helper";

const ScheduleCard: FC<
  PropsWithChildren<{ schedule: ISchedule[]; component: string }>
> = ({ schedule, component }) => {
  const [amount, setAmount] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<IRoomSeat[]>([]);
  const [modalStates, setModalStates] = useState<{
    [sessionId: string]: boolean;
  }>({});

  const mutation = useMutation((sessionId: string) => {
    return TicketService.butTicket({ sessionId, seats: selectedSeats });
  });

  const handleSeatClick = (seat: IRoomSeat) => {
    if (seat.sold == true) {
      return null;
    }

    const seatIndex = selectedSeats.findIndex(
      (selectedSeat) => selectedSeat === seat
    );

    if (seatIndex >= 0) {
      setSelectedSeats((prevSelectedSeats: IRoomSeat[]) =>
        prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );

      setAmount((amount) => (amount -= 400));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats((prevSelectedSeats: IRoomSeat[]) => [
          ...prevSelectedSeats,
          seat,
        ]);

        setAmount((amount) => (amount += 400));
      } else {
        throw Error("Можно выбрать не больше 5 мест");
      }
    }
  };

  const seatStatus = (seat: IRoomSeat) => {
    if (seat.sold) {
      return `${styles.sold_seat}`;
    } else if (selectedSeats.includes(seat)) {
      return `${styles.selected_seat}`;
    } else {
      return `${styles.free_seat}`;
    }
  };

  const handleOpenModal = (sessionId: string) => {
    setModalStates((prevModalStates) => ({
      ...prevModalStates,
      [sessionId]: true,
    }));
  };

  const handleCloseModal = (sessionId: string) => {
    selectedSeats.length = 0;
    setAmount(0);

    setModalStates((prevModalStates) => ({
      ...prevModalStates,
      [sessionId]: false,
    }));
  };

  return (
    <div className={styles.schedule_list}>
      {schedule.map((schedule: ISchedule) => {
        return (
          <>
            <div className={styles.schedule_flex}>
              {component === "film" ? (
                <div className={styles.schedule_film}>
                  <h1 className={styles.title}>{schedule.cinema.name}</h1>
                  <h5 className={styles.address}>{schedule.cinema.address}</h5>
                </div>
              ) : (
                <div className={styles.schedule_cinema}>
                  <Image
                    src={"http://localhost:3033/" + schedule.movie.imgVert}
                    width={150}
                    height={380}
                    alt="movie-vert"
                    placeholder="blur"
                    blurDataURL={"/images-test/loading.gif"}
                    className={styles.movie_img}
                    key={schedule.movie.imgVert}
                  />
                  <div className={styles.film_info}>
                    <div className={styles.cinema_ageRating}>
                      {schedule.movie.ageRating}
                    </div>
                    <div className={styles.cinema_title}>
                      {schedule.movie.title}
                    </div>
                    <div className={styles.cinema_genre}>
                      {schedule.movie.genre.join(", ")}
                    </div>
                    <div className={styles.cinema_duration}>
                      {dateChange(schedule.movie.duration)}
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.rooms}>
                <div className={styles.rooms_grid}>
                  {schedule.sessions.map((session: ISession) => {
                    return (
                      <div
                        className={styles.room}
                        onClick={() => handleOpenModal(session.id)}
                      >
                        <Modal
                          isOpen={modalStates[session.id] || false}
                          onClose={() => handleCloseModal(session.id)}
                          size={"5xl"}
                          isCentered
                        >
                          <ModalOverlay />
                          <ModalContent>
                            {/* <ModalCloseButton /> */}
                            <div className={styles.modal}>
                              <div className={styles.modal_header}>
                                <div className={styles.top_header}>
                                  <h2 className={styles.title}>
                                    {schedule.movie?.title}{" "}
                                  </h2>
                                  <h2 className={styles.ageRating}>
                                    {schedule.movie?.ageRating}
                                  </h2>
                                </div>

                                <div className={styles.address_room}>
                                  <h2 className={styles.address}>
                                    {schedule.cinema.address},
                                  </h2>

                                  <h2 className={styles.room}>
                                    Зал {session.room.number}
                                  </h2>
                                </div>

                                <div className={styles.runDate}>
                                  <h2 className={styles.room}>
                                    {getDayMonth(session.startTime)}
                                  </h2>
                                </div>
                              </div>

                              <div className={styles.line_top}></div>
                              <div className={styles.middle_div}>
                                <div className={styles.seat_types}>
                                  <div className={styles.available_div}>
                                    <span className={styles.basic}></span>
                                    <h3 className={styles.seat_price}>
                                      {session.room_seats[0].price} ₽
                                    </h3>
                                  </div>

                                  <div className={styles.sold_div}>
                                    <span className={styles.sold}></span>
                                    <h3 className={styles.occupied}>Занято</h3>
                                  </div>
                                </div>

                                <div className={styles.screen} />

                                <div className={styles.seats_div}>
                                  {/* <div className={styles.leftSide}>{rows}</div> */}
                                  {session.room_seats.map((seat: IRoomSeat) => {
                                    return (
                                      <Tooltip
                                        hasArrow
                                        label={`${seat.row} ряд ${seat.column} место`}
                                        placement="top"
                                        bg="white"
                                        textColor="black"
                                        rounded="2xl"
                                        isDisabled={seat.sold ? true : false}
                                      >
                                        <button
                                          onClick={() => handleSeatClick(seat)}
                                          className={seatStatus(seat)}
                                        />
                                      </Tooltip>
                                    );
                                  })}
                                  {/* <div className={styles.rightSide}>{rows}</div> */}
                                </div>
                              </div>

                              <div className={styles.line_bottom}></div>
                              <div className={styles.bottom_div}>
                                {selectedSeats.map((seat: IRoomSeat) => {
                                  return (
                                    <div className={styles.selected_seats_list}>
                                      <div>
                                        <div className={styles.position}>
                                          Ряд {seat.row}, Место {seat.column}
                                        </div>
                                        <div className={styles.position_price}>
                                          <span className={styles.color}></span>
                                          <h3 className={styles.price}>
                                            {seat.price}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}

                                <Button
                                  onClick={() => mutation.mutate(session.id)}
                                  isDisabled={!selectedSeats.length}
                                  className={
                                    selectedSeats.length
                                      ? styles.btn_buy
                                      : styles.btn_disabled
                                  }
                                >
                                  {!selectedSeats.length
                                    ? "Места не выбраны"
                                    : `Купить ${amount} ₽`}
                                </Button>
                              </div>
                            </div>
                          </ModalContent>
                        </Modal>
                        <h1 className={styles.time}>
                          {getTime(session.startTime)}
                        </h1>
                        <h5 className={styles.price}>
                          {session.room_seats[0].price} ₽
                        </h5>
                        <h5 className={styles.room_number}>
                          {session.room.number}
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.line}></div>
          </>
        );
      })}
    </div>
  );
};

export default ScheduleCard;
