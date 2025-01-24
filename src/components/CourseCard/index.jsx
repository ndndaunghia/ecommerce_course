import React from 'react';
import {CiUser, CiAlarmOn} from 'react-icons/ci';

const CourseCard = ({
  imageUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1WdsQBUKaIBgM27x4nNJoy6uvnjdaE.png',
  title = 'Kiến Thức Nền Tảng',
  subtitle = 'Kiến thức nhập môn{}',
  courseName = 'Kiến Thức Nhập Môn IT',
  students = 132581,
  duration = '3h12p',
}) => {
  return (
    <div className="w-[280px] rounded-lg overflow-hidden bg-white shadow-md">
      {/* Card Header with Image */}
      <div className=" h-[120px]">
        <img
          src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className=" inset-0 bg-opacity-50 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/90">{subtitle}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        <h4 className="font-medium text-lg text-gray-800">{courseName}</h4>
        <div className="text-orange-500 font-medium">Miễn phí</div>
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
  );
};

export default CourseCard;
