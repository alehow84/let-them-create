import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import HomepageTop from "./components/homepage/HomepageTop";
import HomepageBottom from "./components/homepage/HomepageBottom";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomepageTop />
      <HomepageBottom />
      <Footer />
    </>
  );
}
