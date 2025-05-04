import React from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import Banner from '@/components/Banner';
import CourseList from './components/CourseList';
import Footer from '@/components/Footer/Footer';

function Home() {
  return (
    <MainLayout>
      <Banner />
      <CourseList title="Khóa học miễn phí" type="free" />
      <CourseList title="Khóa học Pro" type="pro" />
      <Footer />
    </MainLayout>
  );
}

export default Home;