import { ProjectProps } from "@/types/projects";
import styles from "./ProjectUserCard.module.css";
import { Album } from "lucide-react";
import Link from "next/link";

export default function ProjectUserCard(props: { project: ProjectProps }) {
  return (
    <Link href={props.project.html_url} target="_blank" className={styles.link}>
      <Album size={"3rem"} color="#6A46BE" />
      <div className={styles.infoProject}>
        <h1>{props.project.name}</h1>
        <p>{props.project.description}</p>
        <div className={styles.languageAndData}>
          <p>{props.project.language}</p>
          <p>Criado em {props.project.created_at.toLocaleDateString()}</p>
          <p>Atualizado em{props.project.pushed_at.toLocaleDateString()}</p>
        </div>
      </div>
    </Link>
  );
}
