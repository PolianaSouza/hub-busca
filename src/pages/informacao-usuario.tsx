import { api } from "@/services/apiClient";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/informacao-usuario.module.css";
import UserInformations from "@/components/user/UserInformations";
import { UserProps } from "@/types/user";
import { ProjectProps } from "@/types/projects";
import ProjectUserCard from "@/components/user/ProjectUserCard";
import { ChevronLeft } from "lucide-react";
import Loading from "@/components/common/LoadingComponent";

export default function InformationUser() {
  const router = useRouter();
  const { user } = router.query;
  const [userInformations, setUserInformations] = useState<UserProps | null>(
    null
  );

  const [projectsUser, setProjectsUser] = useState<ProjectProps[] | null>(null);
  const [loadingActive, setLoadingActive] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const { data } = await api.get(`users/${user}`);

        const {
          avatar_url,
          name,
          login,
          location,
          followers,
          following,
          id,
          public_repos,
          repos_url,
        } = data;

        const userData: UserProps = {
          avatar_url,
          name,
          login,
          location,
          followers,
          following,
          id,
          public_repos,
          repos_url,
        };

        setUserInformations(userData);
      } catch (error) {
        console.log(error);
      }
    }

    async function getProjectsUser(user: string) {
      try {
        const { data } = await api.get(`users/${user}/repos`);

        const projectData: ProjectProps[] = data.map((project: any) => ({
          name: project.name,
          language: project.language,
          description: project.description,
          html_url: project.html_url,
          created_at: new Date(project.created_at),
          pushed_at: new Date(project.pushed_at),
        }));

        setProjectsUser(projectData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingActive(false);
      }
    }

    if (user) {
      setLoadingActive(true);
      getUserInfo();
      getProjectsUser(user as string);
    } else {
      setLoadingActive(false);
    }
  }, [user]);

  if (loadingActive) {
    return (
      <div className={styles.divLoading}>
        <Loading loadingActive={loadingActive} />
      </div>
    );
  }

  if (userInformations) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Informações do usuário</title>
        </Head>

        <aside className={styles.aside}>
          {userInformations && <UserInformations user={userInformations} />}
        </aside>
        {userInformations && (
          <main>
            <section className={styles.section}>
              <div className={styles.repositorios}>
                <p>
                  <strong className={styles.strong}>
                    {userInformations?.public_repos}
                  </strong>{" "}
                  repositórios públicos
                </p>
              </div>
              {projectsUser &&
                projectsUser.map((project) => (
                  <ProjectUserCard key={project.name} project={project} />
                ))}
            </section>
          </main>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.containerNotUser}>
        <div className={styles.cardMessage}>
          <h1>Usuário não informado!</h1>
          <p>
            por favor busque por um usuário no gitHub para ter acesso a suas
            informações
          </p>
          <button className={styles.btnGoBack} onClick={() => router.push("/")}>
            <ChevronLeft />
            Buscar usuário
          </button>
        </div>
      </div>
    );
  }
}
