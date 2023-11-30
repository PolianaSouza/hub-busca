import { useState, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import styles from "./Search.module.css";

type searchProps = {
  findUser: (nameUser: string) => Promise<void>;
};

export default function ButtonSearch({ findUser }: searchProps) {
  const [userName, setUserName] = useState("");

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      findUser(userName);
    }
  }

  return (
    <div className={styles.seachInputContainer}>
      <input
        type="text"
        placeholder="Pesquisar..."
        className={styles.seachInput}
        onChange={(e) => setUserName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        placeholder="Pesquisar"
        className={styles.btnSearch}
        onClick={() => findUser(userName)}
      >
        <Search size={25} className={styles.iconSearch} />
      </button>
    </div>
  );
}
