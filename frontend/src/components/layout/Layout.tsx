import { FC, PropsWithChildren } from "react";
import Header from "./header/Header";
import styles from "./Layout.module.scss";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
