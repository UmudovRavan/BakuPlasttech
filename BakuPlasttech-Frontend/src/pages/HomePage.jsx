import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import FeaturedProductsSection from '../components/home/FeaturedProductsSection';
import AboutSection from '../components/home/AboutSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import CategoriesShowcaseSection from '../components/home/CategoriesShowcaseSection';
import CtaSection from '../components/home/CtaSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProductsSection />
        <AboutSection />
        <WhyChooseSection />
        <CategoriesShowcaseSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
