import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Menu.module.scss";
import { menuList } from "./menu.data";

const Menu: FC = () => {
  const { pathname } = useRouter();

  return (
    <div className={styles.menu}>
      <div className={styles.list}>
        <nav>
          <ul>
            {menuList.map((item) => (
              <li key={item.name}>
                <Link
                  className={pathname === item.link ? styles.active : ""}
                  key={item.link}
                  href={item.link}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
