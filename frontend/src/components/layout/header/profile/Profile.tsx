import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { Button, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { FiUser } from "react-icons/fi";
import styles from "./Profile.module.scss";

const Profile: FC = () => {
  const { isLoggedIn } = useAuth();

  // const { logout } = useActions();

  return (
    <div className={styles.profile}>
      {isLoggedIn ? (
        <IconButton
          colorScheme="red"
          aria-label="ToProfile"
          icon={<FiUser />}
        />
      ) : (
        <Button colorScheme="grey">
          <Link href="/signIn" className={styles.goAuth}>
            Войти
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Profile;
