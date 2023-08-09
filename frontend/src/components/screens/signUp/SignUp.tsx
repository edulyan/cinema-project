import Layout from "@/components/layout/Layout";
import { useActions } from "@/hooks/useActions";
import { useAuth } from "@/hooks/useAuth";
import { IRegister } from "@/models/user";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styles from "./SignUp.module.scss";

const SignUp: FC = () => {
  const { isLoggedIn } = useAuth();
  const { register } = useActions();
  const { push } = useRouter();

  const [inputData, setInputData] = useState<IRegister>({
    firstName: "",
    lastName: "",
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
      <div className={styles.signUp}>
        <h1 className={styles.title}>Регистрация</h1>
        <Input
          onChange={(e) =>
            setInputData({ ...inputData, firstName: e.target.value })
          }
          placeholder="Имя"
          value={inputData.firstName}
        />
        <Input
          className={styles.input}
          onChange={(e) =>
            setInputData({ ...inputData, lastName: e.target.value })
          }
          placeholder="Фамилия"
          value={inputData.lastName}
        />
        <Input
          className={styles.input}
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
          <Link href="signIn">
            <button className={styles.btn_signIn}>Войти</button>
          </Link>

          <button className={styles.btn_signUp}>Зарегистрироваться</button>
        </div>

        <div className={styles.enter_div}>
          <Link href="/signIn">
            <Button
              className={styles.enter_btn}
              size="lg"
              colorScheme="red"
              onClick={() => register(inputData)}
            >
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
