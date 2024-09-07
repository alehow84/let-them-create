import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <body className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <h1>Let Them Create Homepage</h1>
        </main>
        <Footer />
      </body>
    </>
  );
}
