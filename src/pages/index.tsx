import Search from "@/components/search/Search";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.mainPage}>
      <div className={styles.cardSearch}>
        <h1 className={styles.logo}>
          <strong className={styles.strong}>HUB</strong>usca
        </h1>
        <Search />
      </div>
    </main>
  );
}
