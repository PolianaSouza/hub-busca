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
  const [recentSearches, setRecentSearches] = useState<UserProps[]>([]);

  const notify = (message: string) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function addRecentSearches(user: UserProps) {
    setRecentSearches([user, ...recentSearches]);
    const storedListUsers = localStorage.getItem("recentSearches");
    const verifyListUsers = storedListUsers ? JSON.parse(storedListUsers) : [];
    const newListUsers = [user, ...verifyListUsers];
    localStorage.setItem("recentSearches", JSON.stringify(newListUsers));
  }

  async function findUser(nameUser: string) {
    if (nameUser === "") return notify("Digite um nome de usuário");

    try {
      setLoadingActive(true);
      const { data } = await api.get(`users/${nameUser}`);
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
      addRecentSearches(userData);
    } catch (error: any) {
      setLoadingActive(false);
      if (error.response.status === 404) {
        notify("Usuário não encontrado");
      } else {
        notify("Erro ao buscar usuário");
      }
      console.log(error);
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
      </main>
    </>
  );
}
