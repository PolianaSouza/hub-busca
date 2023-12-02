import { useState } from "react";
import Search from "@/components/search/Search";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

import { UserProps } from "@/types/user";
import { api } from "@/services/apiClient";
import UserCard from "@/components/user/UserCard";

export default function Home() {
  const [user, setUser] = useState<UserProps | null>(null);

  async function findUser(nameUser: string) {
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
          {user && <UserCard user={user} />}
        </div>
      </main>
    </>
  );
}
