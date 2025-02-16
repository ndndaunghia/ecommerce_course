import React from 'react';
import CourseList from '../Home/components/CourseList';
import MainLayout from '@/layouts/MainLayout';
import Footer from '@/components/Footer/Footer';

const MyCourses = () => {
  return (
    <MainLayout>
      <div className="pt-20"></div>
      <CourseList title="Khóa học của tôi" />
      <Footer />
    </MainLayout>
  );
};

export default MyCourses;
