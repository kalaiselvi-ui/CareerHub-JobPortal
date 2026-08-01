import Categories from "../components/home/Categories.tsx";
import CTASection from "../components/home/CTA.tsx";
import FeaturedJobs from "../components/home/FeaturedJob.tsx";
import HeroSection from "../components/home/Hero.tsx";
import HowItWorks from "../components/home/HowItWorks.tsx";
import SearchSection from "../components/common/SearchSection.tsx";
import Statistics from "../components/home/Statistics.tsx";
import WhyChooseUs from "../components/home/WhyChooseUs.tsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchSection />
      <Categories />
      <FeaturedJobs />
      <WhyChooseUs />
      <Statistics />
      <HowItWorks />
      <CTASection />
    </div>
  );
};

export default Home;
