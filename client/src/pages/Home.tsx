import Categories from "../components/home/Categories.tsx";
import HeroSection from "../components/home/Hero.tsx";
import SearchSection from "../components/home/SearchSection.tsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <Categories />
    </div>
  );
};

export default Home;
