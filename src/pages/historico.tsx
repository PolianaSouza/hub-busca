import UserCard from "@/components/user/UserCard";
import { UserProps } from "@/types/user";
import { useEffect, useState } from "react";
import styles from "@/styles/historico.module.css";
import Head from "next/head";
import UserNotExist from "@/components/user/UserNotExist";

export default function Historico() {
  const [listUsers, setListUsers] = useState<UserProps[]>([]);

  const options = {
    title: "Você não tem pesquisas recentes!",
    message:
      "por favor busque por um usuário no gitHub para salvar no histórico de pesquisas",
  };

  useEffect(() => {
    function getLocalStorage() {
      const recentSearches = localStorage.getItem("recentSearches");
      const recents = recentSearches ? JSON.parse(recentSearches) : [];
      const userData: UserProps[] = recents;
      setListUsers(userData);
    }
    getLocalStorage();
  }, []);

  function clearHistory() {
    const confirmAction = window.confirm(
      "Deseja realmente apagar o histórico?"
    );
    if (!confirmAction) return;

    localStorage.removeItem("recentSearches");
    setListUsers([]);
  }

  if (listUsers.length === 0) {
    return (
      <div className={styles.notUser}>
        <UserNotExist options={options} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Histórico</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Pesquisas recentes</h1>
          <button className={styles.btnDelete} onClick={() => clearHistory()}>
            Apagar histórico
          </button>
        </div>
        <div className={styles.usersCards}>
          {listUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </main>
    </>
  );
}
