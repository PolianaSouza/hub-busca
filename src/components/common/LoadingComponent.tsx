import { useState } from "react";
import Lottie from "lottie-react";
import styles from "./Loading.module.css";
import loading from "../../assets/loading.json";

export default function Loading(props: { loadingActive: boolean }) {
  return (
    <div>
      {props.loadingActive && (
        <div>
          <Lottie
            animationData={loading}
            loop={true}
            className={styles.loading}
          />
          <p>Buscando usuários</p>
        </div>
      )}
    </div>
  );
}
