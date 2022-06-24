import NavbarAuthenticated from "./NavbarAuthenticated";
export default function LayoutAuthenticated(props: any) {
  return (
    <>
      <NavbarAuthenticated />
      <main
        style={{
          padding: '70px 180px'
        }}
      >
        {props.children}
      </main>
    </>
  );
}
