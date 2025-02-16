import React from 'react'
import { CiPlay1, CiClock2, CiBookmark, CiGrid41 } from "react-icons/ci"

const CourseDetail = () => {
    const learningOutcomes = [
      "Các kiến thức cơ bản, nền móng của ngành IT",
      "Các khái niệm, thuật ngữ cốt lõi khi triển khai ứng dụng",
      "Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng",
      "Hiểu hơn về cách internet và máy vi tính hoạt động",
    ]
  
    const courseContent = [
      {
        id: 1,
        title: "Khái niệm kỹ thuật cần biết",
        lessons: [
          { id: 1, title: "Mô hình Client - Server là gì?", duration: "11:35" },
          { id: 2, title: "Domain là gì? Tên miền là gì?", duration: "10:34" },
          { id: 3, title: "Mua áo F8 | Đăng ký học Offline", duration: "01:00" },
        ],
      },
      {
        id: 2,
        title: "Môi trường, con người IT",
        lessons: [],
      },
      {
        id: 3,
        title: "Phương pháp, định hướng",
        lessons: [],
      },
    ]
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">Kiến Thức Nhập Môn IT</h1>
            <p className="text-gray-600 mb-8">
              Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.
            </p>
  
            {/* What you'll learn section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Bạn sẽ học được gì?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Course Content */}
            <div>
              <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>4 chương • 12 bài học</span>
                <span>Thời lượng 03 giờ 26 phút</span>
                <button className="text-blue-500 hover:underline">Mở rộng tất cả</button>
              </div>
  
              {/* Chapters */}
              <div className="space-y-4">
                {courseContent.map((chapter) => (
                  <div key={chapter.id} className="rounded-lg">
                    <div className="flex items-center justify-between rounded-lg p-4 bg-primary-light">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {chapter.id}. {chapter.title}
                        </span>
                        <span className="text-sm text-gray-500">{chapter.lessons.length} bài học</span>
                      </div>
                    </div>
                    {chapter.lessons.length > 0 && (
                      <div className="divide-y rounded-lg">
                        {chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-primary-light">
                            <div className="flex items-center gap-2">
                              <CiPlay1 className="text-gray-400" />
                              <span>
                                {lesson.id}. {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
                    alt="Course thumbnail"
                    className="w-full"
                  />
                </div>
  
                <div className="p-6 bg-white">
                  <div className="text-xl font-bold text-primary-dark mb-6">Miễn phí</div>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-full font-medium hover:bg-blue-600 mb-6">
                    ĐĂNG KÝ HỌC
                  </button>
  
                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <CiBookmark className="w-5 h-5" />
                      <span>Tổng số 12 bài học</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CiClock2 className="w-5 h-5" />
                      <span>Thời lượng 03 giờ 26 phút</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CiGrid41 className="w-5 h-5" />
                      <span>Học mọi lúc, mọi nơi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default CourseDetail