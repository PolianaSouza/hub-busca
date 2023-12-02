import { useState } from "react";
import Search from "@/components/search/Search";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { UserProps } from "@/types/user";
import { api } from "@/services/apiClient";
import UserCard from "@/components/user/UserCard";
import LoadingComponent from "@/components/common/LoadingComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [user, setUser] = useState<UserProps | null>(null);

  const [loadingActive, setLoadingActive] = useState(false);

  const notify = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  async function findUser(nameUser: string) {
    try {
      setLoadingActive(true);
      const { data } = await api.get(`users/${nameUser}`);
      console.log(data);
      const {
        avatar_url,
        name,
        login,
        location,
        followers,
        following,
        id,
        public_repos,
        repos_url,
      } = data;

      const userData: UserProps = {
        avatar_url,
        name,
        login,
        location,
        followers,
        following,
        id,
        public_repos,
        repos_url,
      };

      setUser(userData);
      setLoadingActive(false);
    } catch (error: any) {
      setLoadingActive(false);
      if (error.response.status === 404) {
        notify("Usuário não encontrado");
      } else {
        notify("Erro ao buscar usuário");
        // setLoadingActive(false);
      }
      console.log("aqui", error);
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.mainPage}>
        <div className={styles.cardSearch}>
          <h1 className={styles.logo}>
            <strong className={styles.strong}>HUB</strong>usca
          </h1>
          <p className={styles.description}>Encontre Devs no GitHub</p>
          <Search findUser={findUser} />
          <LoadingComponent loadingActive={loadingActive} />
          {user && <UserCard user={user} />}
          <ToastContainer autoClose={1000} />
        </div>
        <div></div>
      </main>
    </>
  );
}
