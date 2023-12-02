import { useState } from "react";
import Lottie from "lottie-react";
import styles from "./Loading.module.css";
import loading from "../../assets/loading.json";

export default function Loading(props: { loadingActive: boolean }) {
  return (
    <div>
      {props.loadingActive && (
        <Lottie
          animationData={loading}
          loop={true}
          className={styles.loading}
        />
      )}
    </div>
  );
}
