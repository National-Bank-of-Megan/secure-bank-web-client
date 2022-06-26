import NavbarAuthenticated from "./NavbarAuthenticated";
export default function LayoutAuthenticated(props: any) {
  return (
    <>
      <NavbarAuthenticated />
      <main
        style={{
          padding: '70px 180px 20px'
        }}
      >
        {props.children}
      </main>
    </>
  );
}
