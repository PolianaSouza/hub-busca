import Header from "./common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main> {children} </main>
    </>
  );
}
