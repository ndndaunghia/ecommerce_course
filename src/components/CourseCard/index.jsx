import React from 'react';
import { CiUser, CiAlarmOn } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const CourseCard = ({
  id,
  imageUrl = 'https://files.fullstack.edu.vn/f8-prod/courses/7.png', 
  title = 'Kiến Thức Nền Tảng',
  subtitle = 'Kiến thức nhập môn',
  courseName = 'Kiến Thức Nhập Môn IT',
  students = 0,
  duration = 'Chưa xác định',
  price = '0.000', 
}) => {
  const numericPrice = parseFloat(price); 
  const isFree = numericPrice === 0; 

  return (
    <Link to={`/course-detail/${id}`}>
      <div className="w-[280px] rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow">
        {/* Card Header with Image */}
        <div className="h-[120px] relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
            {/* <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="text-sm text-white/90">{subtitle}</p>
            </div> */}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <h4 className="font-medium text-lg text-gray-800">{courseName}</h4>
          <div className="text-orange-500 font-medium">
            {isFree
              ? 'Miễn phí'
              : `${new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(numericPrice)}`}
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CiUser className="w-4 h-4" />
              {new Intl.NumberFormat().format(students)}
            </div>
            <div className="flex items-center gap-1">
              <CiAlarmOn className="w-4 h-4" />
              {duration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;