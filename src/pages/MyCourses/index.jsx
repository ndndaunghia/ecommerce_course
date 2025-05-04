import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Footer from '@/components/Footer/Footer';
import {useSelector} from 'react-redux';
import CourseCard from '@/components/CourseCard';

const MyCourses = () => {
  const myCourse = useSelector((state) => state.course.myCourses.courses);

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen">
        <div className="pt-20"></div>
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Khóa học của tôi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myCourse.length > 0 ? (
              myCourse.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.course_id}
                  imageUrl={course.courses.thumbnail_url}
                  title={course.courses.name}
                  subtitle={course.subtitle || 'Không có phụ đề'}
                  courseName={course.courses.name}
                  students={course.courses.total_purchases}
                  price={course.courses.price}
                  duration={course.courses.duration ? `${course.courses.duration} giờ` : 'Chưa xác định'}
                />
              ))
            ) : (
              <p>Không có khóa học nào để hiển thị.</p>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </MainLayout>
  );
};

export default MyCourses;
