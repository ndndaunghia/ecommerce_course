import CourseCard from '@/components/CourseCard';
import React from 'react';
const courses = [
  {
    id: 1,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'Kiến Thức Nền Tảng',
    subtitle: 'Kiến thức nhập môn{}',
    courseName: 'Kiến Thức Nhập Môn IT',
    students: 132581,
    duration: '3h12p',
  },
  {
    id: 2,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'Lập trình C++',
    subtitle: 'Từ cơ bản đến nâng cao',
    courseName: 'Lập trình C++ cơ bản, nâng cao',
    students: 32507,
    duration: '10h18p',
  },
  {
    id: 3,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'HTML, CSS',
    subtitle: 'từ zero đến hero',
    courseName: 'HTML CSS từ Zero đến Hero',
    students: 205834,
    duration: '29h5p',
  },
  {
    id: 4,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'Responsive',
    subtitle: '@web design',
    courseName: 'Responsive Web Design',
    students: 45200,
    duration: '5h20p',
  },
  {
    id: 5,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'JavaScript',
    subtitle: '{ Cơ bản }',
    courseName: 'Học JavaScript Cơ Bản',
    students: 98662,
    duration: '15h45p',
  },
  {
    id: 6,
    imageUrl: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    title: 'JavaScript',
    subtitle: '{ Nâng cao }',
    courseName: 'JavaScript Nâng Cao',
    students: 24256,
    duration: '8h32p',
  },
];

const CourseList = (props) => {
  const {title} = props;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            imageUrl={course.imageUrl}
            title={course.title}
            subtitle={course.subtitle}
            courseName={course.courseName}
            students={course.students}
            duration={course.duration}
          />
        ))}
      </div>
    </div>
  );
};
export default CourseList;
