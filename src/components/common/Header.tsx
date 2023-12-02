import { useState, useEffect } from "react";
import Link from "next/link";
import Navilinks from "../navlinks/Navilinks";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 800) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    });
  }, []);

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
    <header className={styles.header}>
      <div className={styles.logoAndMenu}>
        <Link href={"/"} className={styles.decoration}>
          <h1 className={styles.logo}>
            <strong className={styles.strong}>HUB</strong>usca
          </h1>
        </Link>
        <Menu
          className={styles.menuIcon}
          size={40}
          color="#ffffff"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {menuOpen && (
        <nav className={styles.navbar}>
          {naviLinks.map((link) => (
            <Navilinks key={link.name} href={link.path}>
              {link.name}
            </Navilinks>
          ))}
        </nav>
      )}
    </header>
  );
}
