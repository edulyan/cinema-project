import Layout from "@/components/layout/Layout";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { ILogin } from "@/models/user";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styles from "./SignIn.module.scss";

const SignIn: FC = () => {
  const { isLoggedIn } = useAuth();
  const { login } = useActions();
  const { push } = useRouter();

  const [inputData, setInputData] = useState<ILogin>({
    email: "",
    passwordHash: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      push("/");
    }
  }, [isLoggedIn]);

  return (
    <Layout>
      <div className={styles.signIn}>
        <h1 className={styles.title}>Войти в систему</h1>
        <Input
          onChange={(e) =>
            setInputData({ ...inputData, email: e.target.value })
          }
          placeholder="Email"
          value={inputData.email}
        />
        <Input
          className={styles.input}
          onChange={(e) =>
            setInputData({ ...inputData, passwordHash: e.target.value })
          }
          placeholder="Пароль"
          value={inputData.passwordHash}
        />

        <div className={styles.btn_div}>
          <button className={styles.btn_signIn}>Войти</button>

          <Link href="signUp">
            <button className={styles.btn_signUp}>Зарегистрироваться</button>
          </Link>
        </div>

        <div className={styles.enter_div}>
          <Button
            className={styles.enter_btn}
            size="lg"
            colorScheme="red"
            onClick={() => login(inputData)}
          >
            Войти
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
