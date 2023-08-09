interface IMenuLink {
  link: string;
  name: string;
}

export const menuList: IMenuLink[] = [
  {
    link: "/",
    name: "Фильмы",
  },
  {
    link: "/feature",
    name: "Свое кино",
  },
  {
    link: "/cinemasList",
    name: "Кинотеатры",
  },
];
