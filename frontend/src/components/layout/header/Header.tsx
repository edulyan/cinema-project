import { FC } from "react";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import Profile from "./profile/Profile";
import styles from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.main}>
      <Logo />
      <Menu />
      <Profile />
    </header>
  );
};

export default Header;
