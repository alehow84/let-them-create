import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <h1>Let Them Create Homepage</h1>
      </main>
      <Footer />
    </div>
  );
}
