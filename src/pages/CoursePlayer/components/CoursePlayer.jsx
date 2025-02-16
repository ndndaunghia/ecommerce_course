import React, {useState} from 'react';
import {CiCircleChevLeft, CiCircleChevDown, CiPlay1, CiLock} from 'react-icons/ci';

const CoursePlayer = () => {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');

  const courseContent = [
    {
      id: 1,
      title: 'Giới thiệu',
      duration: '07:07',
      subsections: [
        {title: 'Giới thiệu khóa học', duration: '01:03', active: true},
        {title: 'Cài đặt Dev - C++', duration: '01:31', locked: true},
        {title: 'Hướng dẫn sử dụng Dev - C++', duration: '03:33', locked: true},
      ],
    },
    {id: 2, title: 'Biến và kiểu dữ liệu', duration: '15:09'},
    {id: 3, title: 'Cấu trúc điều khiển và vòng lặp', duration: '28:03'},
    {id: 4, title: 'Mảng', duration: '22:56'},
    {id: 5, title: 'String', duration: '50:05'},
    {id: 6, title: 'Hàm', duration: '14:17'},
    {id: 7, title: 'Con trỏ', duration: '50:14'},
    {id: 8, title: 'Struct', duration: '05:38'},
    {id: 9, title: 'Làm việc với file', duration: '40:34'},
    {id: 10, title: 'Hướng đối tượng (OOP)', duration: '34:43'},
    {id: 11, title: 'Hoàn thành khóa học', duration: '01:00'},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-primary-light text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg md:text-xl">Lập trình C++ cơ bản, nâng cao</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm md:text-base">
          <span>0%</span>
          <span>0/138 bài học</span>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col md:flex-row pb-16">
        {/* Video Section */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-4">
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Course Content Section */}
        <div className="w-full md:w-1/3 lg:w-1/4 md:border-l overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-medium mb-4">Nội dung khóa học</h2>
            <div className="space-y-2">
              {courseContent.map((section) => (
                <div key={section.id} className="border rounded-lg">
                  <div className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate">
                        {section.id}. {section.title}
                      </span>
                      <div className="text-sm text-gray-500">
                        {section.id}/27 | {section.duration}
                      </div>
                    </div>
                    <CiCircleChevDown className="w-5 h-5 flex-shrink-0 ml-2" />
                  </div>
                  {section.subsections && (
                    <div className="border-t">
                      {section.subsections.map((subsection, idx) => (
                        <div
                          key={idx}
                          className="p-3 pl-6 flex items-center justify-between hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <CiPlay1 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className={`truncate ${subsection.active ? 'text-orange-500' : ''}`}>
                              {subsection.title}
                            </span>
                          </div>
                          {subsection.locked && (
                            <CiLock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <button className="px-4 py-2 border rounded hover:bg-gray-50">← BÀI TRƯỚC</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          BÀI TIẾP THEO →
        </button>
      </div>
    </div>
  );
};

export default CoursePlayer;
