import { Search } from "lucide-react";
import styles from "./Search.module.css";

export default function ButtonSearch() {
  return (
    <div className={styles.seachInputContainer}>
      <input
        type="text"
        placeholder="Pesquisar..."
        className={styles.seachInput}
      />
      <button placeholder="Pesquisar" className={styles.btnSearch}>
        <Search size={25} className={styles.iconSearch} />
      </button>
    </div>
  );
}
