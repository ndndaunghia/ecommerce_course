import { getCourses } from '@/api/courses';
import CourseCard from '@/components/CourseCard';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CourseList = (props) => {
  const { title, type } = props; // Thêm prop type

  const dispatch = useDispatch();
  const allCourses = useSelector((state) => state.course.courses); // Lấy mảng khóa học từ state
  const isLoading = useSelector((state) => state.course.isLoading);

  useEffect(() => {
    console.log('All courses:', allCourses);
  }, [allCourses]);

  // Gọi API lấy danh sách khóa học khi component mount
  useEffect(() => {
    dispatch(getCourses({ page: 1, limit: 10, subject_id: "" }));
  }, [dispatch]);
  // // Lọc khóa học dựa trên type
  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) return [];
    return allCourses.filter((course) => {
      const price = course.price;
      console.log('Price:', price);
      
      if (type === 'free') {
        return price === "0.000"; // Khóa học miễn phí
      } else if (type === 'pro') {
        return price !== "0.000"; // Khóa học pro
      }
      return true; // Nếu không có type, hiển thị tất cả
    });
  }, [allCourses, type]);

  // Xử lý khi đang tải
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                imageUrl={course.thumbnail_url}
                title={course.name}
                subtitle={course.subtitle || 'Không có phụ đề'} // Thêm fallback nếu subtitle không có
                courseName={course.name}
                students={course.total_purchases} 
                price={course.price}
                duration={course.duration ? `${course.duration} giờ` : 'Chưa xác định'}
              />
            ))
          ) : (
            <p>Không có khóa học nào để hiển thị.</p>
          )}
      </div>
    </div>
  );
};

export default CourseList;