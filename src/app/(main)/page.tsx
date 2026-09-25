import { Hero } from "@/features/home/components/Hero";
import { FavoriteMenu } from "@/features/home/components/FavoriteMenu";
import { HowToOrder } from "@/features/home/components/HowToOrder";
import { AboutSection } from "@/features/home/components/AboutSection";

export default function HomePage() {
  return (
    <main className="bg-[#F6F1EA] text-stone-800 font-sans antialiased overflow-x-hidden">
      <Hero />
      <FavoriteMenu />
      <HowToOrder />
      <AboutSection />
    </main>
  );
}
