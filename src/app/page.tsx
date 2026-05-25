import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductGrid from "@/components/home/ProductGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}
