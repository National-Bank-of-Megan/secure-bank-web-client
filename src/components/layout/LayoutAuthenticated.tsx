import NavbarAuthenticated from "./NavbarAuthenticated";
export default function LayoutAuthenticated(props: any) {
  return (
    <>
      <NavbarAuthenticated />
      <main
        style={{
          height: "100vh",
          padding: '70px 180px'
        }}
      >
        {props.children}
      </main>
    </>
  );
}
