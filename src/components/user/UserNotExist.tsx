import React from "react";
import styles from "@/components/user/UserNotExist.module.css";
import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";
import { OptionsProps } from "@/types/optionsNotFound";

export default function UserNotExist(props: { options: OptionsProps }) {
  const router = useRouter();
  return (
    <div className={styles.containerNotUser}>
      <div className={styles.cardMessage}>
        <h1>{props.options.title}</h1>
        <p>{props.options.message}</p>
        <button className={styles.btnGoBack} onClick={() => router.push("/")}>
          <ChevronLeft />
          Buscar usuário
        </button>
      </div>
    </div>
  );
}
