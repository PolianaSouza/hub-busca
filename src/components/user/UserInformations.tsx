import { UserProps } from "@/types/user";
import Image from "next/image";
import {
  UserRound,
  Github,
  MapPin,
  SplitSquareHorizontal,
  UsersRound,
  ChevronLeft,
} from "lucide-react";
import styles from "./UserInformation.module.css";
import { useRouter } from "next/router";

export default function UserCard(props: { user: UserProps }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <Image
          src={props.user.avatar_url}
          alt="foto de perfil"
          unoptimized
          priority
          width={226}
          height={231}
          className={styles.img}
        />
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
        <div className={styles.cardParagraph}>
          <SplitSquareHorizontal color="#6A46BE" />
          <p className={styles.paragraph}> {props.user.id} </p>
        </div>
        <div className={styles.cardParagraph}>
          <UsersRound color="#6A46BE" />
          <p className={styles.paragraph}>
            <strong>{props.user.followers} </strong>
            followers. <strong>{props.user.following}</strong> following
          </p>
        </div>
      </div>
      <button className={styles.btnGoBack} onClick={() => router.push("/")}>
        <ChevronLeft />
        Nova Busca
      </button>
    </div>
  );
}
