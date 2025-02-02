import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TranslationSection from "@/components/TranslationSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Header />
      <main className="mt-8">
        <TranslationSection />
      </main>
      <Footer />
    </div>
  );
}
