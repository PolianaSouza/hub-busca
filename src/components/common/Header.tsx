import Link from "next/link";
import Navilinks from "../navlinks/Navilinks";
import styles from "./Header.module.css";

export default function Header() {
  const naviLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Perfil do usuário",
      path: "/informacao-usuario",
    },
    {
      name: "Histórico",
      path: "/historico",
    },
  ];

  return (
    <nav className={styles.navBar}>
      <div>
        <Link href={"/"} className={styles.decoration}>
          <h1 className={styles.logo}>
            <strong className={styles.strong}>HUB</strong>usca
          </h1>
        </Link>
      </div>
      <nav className={styles.containerLinks}>
        {naviLinks.map((link) => (
          <Navilinks key={link.name} href={link.path}>
            {link.name}
          </Navilinks>
        ))}
      </nav>
    </nav>
  );
}
