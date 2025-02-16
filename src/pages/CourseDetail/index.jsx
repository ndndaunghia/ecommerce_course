import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import CourseDetail from './components';
import Footer from '@/components/Footer/Footer';

const CourseDetailPage = () => {
  return (
    <MainLayout>
      <div className='pt-20'></div>
      <CourseDetail />
      <Footer />
    </MainLayout>
  );
};

export default CourseDetailPage;
