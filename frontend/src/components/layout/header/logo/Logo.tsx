import Link from "next/link";
import { FC } from "react";
import styles from "./Logo.module.scss";

const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Link href="/">
        <h1 className={styles.logo_title}>KINORU</h1>
      </Link>
    </div>
  );
};

export default Logo;
