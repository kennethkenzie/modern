import NavBar from "@/components/NavBar";
import HeroCarouselWithRightCards from "@/components/HeroCarouselWithRightCards";
import TrustBar from "@/components/TrustBar";
import DynamicCategorySection from "@/components/DynamicCategorySection";
import CategoryTilesSection from "@/components/CategoryTilesSection";
import LatestProductsSection from "@/components/LatestProductsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroCarouselWithRightCards />
      <TrustBar />
      <DynamicCategorySection />
      <CategoryTilesSection />
      <LatestProductsSection />
    </main>
  );
}
