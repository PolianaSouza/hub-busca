import { UserProps } from "@/types/user";
import Image from "next/image";
import { UserRound, Github, MapPin } from "lucide-react";
import styles from "./UserCard.module.css";
import Link from "next/link";

export default function UserCard(props: { user: UserProps }) {
  return (
    <div className={styles.container}>
      <div>
        <Link
          href={{
            pathname: "/informacao-usuario",
            query: { user: props.user.login },
          }}
        >
          <Image
            src={props.user.avatar_url}
            alt="foto de perfil"
            unoptimized
            priority
            width={226}
            height={231}
            className={styles.img}
          />
        </Link>
      </div>
      <div className={styles.cardInfoUser}>
        <div className={styles.cardParagraph}>
          <UserRound color="#6A46BE" />
          <p className={styles.paragraph}> {props.user.name} </p>
        </div>
        <div className={styles.cardParagraph}>
          <Github color="#6A46BE" />
          <p className={styles.paragraph}> {props.user.login} </p>
        </div>
        <div className={styles.cardParagraph}>
          <MapPin color="#6A46BE" />
          {props.user.location === null ? (
            <p className={styles.paragraph}> Not informed </p>
          ) : (
            <p className={styles.paragraph}> {props.user.location} </p>
          )}
        </div>
      </div>
    </div>
  );
}
