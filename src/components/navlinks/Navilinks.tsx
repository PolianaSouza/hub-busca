"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navilinks.module.css";

type ActiveLinkProps = LinkProps & {
  children: React.ReactNode;
};

export default function Navilinks({
  href,
  children,
  ...rest
}: ActiveLinkProps) {
  const pathName = usePathname();
  console.log("pathName", pathName);

  const isActive = pathName === href;

  return (
    <nav className={styles.links}>
      <Link
        href={href}
        className={
          (styles.linksDecoration,
          isActive ? styles.active : styles.linksDecoration)
        }
        {...rest}
      >
        {children}
      </Link>
    </nav>
  );
}
