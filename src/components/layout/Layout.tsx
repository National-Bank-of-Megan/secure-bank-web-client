import Navbar from "./Navbar";

export default function Layout(props: any) {
  return (
    <>
      <Navbar />
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
