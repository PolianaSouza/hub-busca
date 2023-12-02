import UserCard from "@/components/user/UserCard";
import { UserProps } from "@/types/user";
import { useEffect, useState } from "react";
import styles from "@/styles/historico.module.css";
import Head from "next/head";

export default function Historico() {
  const [listUsers, setListUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    function getLocalStorage() {
      const recentSearches = localStorage.getItem("recentSearches");
      const recents = recentSearches ? JSON.parse(recentSearches) : [];
      const userData: UserProps[] = recents;
      setListUsers(userData);
      console.log("lista", listUsers);
    }
    getLocalStorage();
  }, []);

  return (
    <>
      <Head>
        <title>Histórico</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1>Pesquisas recentes</h1>
          <button className={styles.btnDelete}>Apagar histórico</button>
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
