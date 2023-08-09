import { FC, forwardRef, useState } from "react";
import { BiMap } from "react-icons/bi";
import { SiMoscowmetro } from "react-icons/si";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { GoTriangleDown } from "react-icons/go";
import Layout from "@/components/layout/Layout";
import { IGetCinemaRes } from "@/models/cinema";
import ScheduleCard from "@/ui/scheduleCard/ScheduleCard";
import { CinemaService } from "@/services/cinema.service";

import styles from "./Cinema.module.scss";
import "react-datepicker/dist/react-datepicker.css";

type Ref = HTMLButtonElement;
type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const Cinema: FC<IGetCinemaRes> = ({ cinema }) => {
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
    ["schedule", cinema.id, selectedDate],
    () =>
      CinemaService.getMovieSchedulesByDate(cinema.id, new Date(selectedDate)),
    {
      initialData: [],
      keepPreviousData: true,
    }
  );

  return (
    <div className={styles.cinema_main}>
      <Layout />

      <div className={styles.main_block}>
        <div className={styles.cinema_info}>
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

          <ScheduleCard schedule={response} component={"cinema"} />
        </div>
      </div>
    </div>
  );
};

export default Cinema;
