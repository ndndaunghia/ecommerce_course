import React from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import Banner from '@/components/Banner';
import CourseList from './components/CourseList';
import Footer from '@/components/Footer/Footer';
import FeatureSection from '@/components/FeatureSection/FeatureSection';
import CategorySection from '@/components/CategorySection';
import StatSection from '@/components/StatSection';
import FaqSection from '@/components/FaqSection/FaqSection';
import NewsletterSection from '@/components/NewsletterSection';

function Home() {
  return (
    <MainLayout>
      <Banner />
      <FeatureSection />
      <CategorySection /> 
      <CourseList title="Khóa học miễn phí" type="free" />
      <CourseList title="Khóa học Pro" type="pro" />
      <StatSection/>
      <FaqSection />
      <NewsletterSection />
      <Footer />
    </MainLayout>
  );
}

export default Home;