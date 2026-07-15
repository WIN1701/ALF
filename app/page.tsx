import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Historia from "../Components/Historia";
import Catalogo from "../Components/Catalogo";
import Banner from "../Components/Banner";
import Beneficios from "../Components/Beneficios";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-black text-white">
      <Navbar />
      <Hero />
      <Historia />
      <Catalogo />
      <Banner />
      <Beneficios />
      <Footer />
    </main>
  );
}