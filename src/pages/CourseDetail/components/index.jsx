import {addCourse, getCourse, purchaseCourse} from '@/api/courses';
import {getAuthToken} from '@/utils/localStorage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {use} from 'react';
import {CiPlay1, CiClock2, CiBookmark, CiGrid41} from 'react-icons/ci';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

const learningOutcomes = [
  'Nắm vững kiến thức trọng tâm và các dạng bài thường gặp trong đề thi tốt nghiệp THPT',
  'Phương pháp giải nhanh và kỹ thuật làm bài hiệu quả để tiết kiệm thời gian trong phòng thi',
  'Hệ thống hóa kiến thức theo từng chuyên đề và mức độ khó tăng dần',
  'Luyện đề và bài tập mẫu với cấu trúc tương tự đề thi chính thức các năm gần đây',
];

const CourseDetail = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  const course = useSelector((state) => state.course.course);
  const paymentUrl = useSelector((state) => state.course.paymentUrl);
  const myCourse = useSelector((state) => state.course.myCourses.courses);
  const isLoading = useSelector((state) => state.course.isLoading);
  const error = useSelector((state) => state.course.error);

  const [expandedModules, setExpandedModules] = useState({});
  const [expandedLessons, setExpandedLessons] = useState({});
  const [expandAll, setExpandAll] = useState(false);

  const addCourseToCollection = async () => {
    if (course.course.price === '0.000') {
      dispatch(addCourse(id));
    } else {
      localStorage.setItem('pending_course_id', course.course.id.toString());
      dispatch(purchaseCourse({courseId: id, amount: course.course.price}));
    }
  };

  const navigateToCoursePlayer = (courseId) => {
    if (courseId) {
      navigate(`/course-player/${courseId}`);
    } else {
      console.error('Invalid courseId:', courseId);
    }
  };

  // localStorage.setItem("pending_course_id", course.id.toString());

  // window.location.href = response.data.data.payment_url;

  const isCanAddCourse =
    !myCourse || myCourse.length === 0 || myCourse.filter((course) => course.course_id == id).length === 0;

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  useEffect(() => {
    if (id) {
      dispatch(getCourse(id));
    }
  }, [dispatch, id]);

  // localStorage.setItem("pending_course_id", course.id.toString());

  // window.location.href = response.data.data.payment_url;

  useEffect(() => {
    if (course?.course?.module) {
      const moduleState = course.course.module.reduce((acc, module) => {
        acc[module.id] = expandAll;
        return acc;
      }, {});
  
      const lessonState = course.course.module.reduce((acc, module) => {
        module.lesson.forEach((lesson) => {
          acc[lesson.id] = expandAll;
        });
        return acc;
      }, {});
  
      // Only update state if the values have changed
      setExpandedModules((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(moduleState)) {
          return moduleState;
        }
        return prev;
      });
  
      setExpandedLessons((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(lessonState)) {
          return lessonState;
        }
        return prev;
      });
    }
  }, [course, expandAll]);

  // Hàm toggle một module cụ thể
  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  // Hàm toggle một bài học cụ thể
  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // Hàm toggle tất cả các module và bài học
  const toggleAll = () => {
    const newExpandAll = !expandAll;
    setExpandAll(newExpandAll);

    if (course?.course?.module) {
      const moduleState = {};
      const lessonState = {};

      course.course.module.forEach((module) => {
        moduleState[module.id] = newExpandAll;
        module.lesson.forEach((lesson) => {
          lessonState[lesson.id] = newExpandAll;
        });
      });

      setExpandedModules(moduleState);
      setExpandedLessons(lessonState);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Lỗi: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-yellow-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">Không tìm thấy khóa học.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalLessons = course?.course?.module.reduce((total, mod) => total + mod.lesson.length, 0);
  const totalMinutes = course?.course?.duration || 0;

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.course.name}</h1>
            <p className="text-gray-600 mb-4">
              {course.course.description ||
                'Để có cái nhìn tổng quan về khóa học này, hãy xem các nội dung bên dưới.'}
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CiBookmark className="w-5 h-5 mr-1" />
                <span>{totalLessons} bài học</span>
              </div>
              <div className="flex items-center">
                <CiClock2 className="w-5 h-5 mr-1" />
                <span>{totalMinutes} giờ</span>
              </div>
              <div className="flex items-center">
                <CiGrid41 className="w-5 h-5 mr-1" />
                <span>{course.course.module.length} chương</span>
              </div>
            </div>
          </div>

          {/* What you'll learn section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Bạn sẽ học được gì?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-500 flex-shrink-0" // Tăng kích thước lên w-6 h-6
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Nội dung khóa học</h2>
              <button
                onClick={toggleAll}
                className="flex items-center gap-1 text-blue-600 transition px-4 py-2 rounded-full text-sm font-medium"
              >
                {expandAll ? (
                  <>
                    <FiChevronUp className="text-blue-600" />
                    Thu gọn tất cả
                  </>
                ) : (
                  <>
                    <FiChevronDown className="text-blue-600" />
                    Mở rộng tất cả
                  </>
                )}
              </button>
            </div>

            <div className="text-sm text-gray-500 mb-6 flex items-center justify-between  p-3 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {course.course.module.length} chương
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {totalLessons} bài học
                </span>
              </div>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Thời lượng {totalMinutes} giờ
              </span>
            </div>

            {/* Chapters */}
            <div className="space-y-4">
              {course.course.module.map((chapter) => (
                <div
                  key={chapter.id}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer transition-colors bg-white text-gray-800 hover: rounded-t-lg"
                    onClick={() => toggleModule(chapter.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-800">
                        {chapter.order}. {chapter.name}
                      </span>
                      <span className="text-sm px-3 py-1 rounded-full  text-blue-600 border border-blue-100">
                        {chapter.lesson.length} bài học
                      </span>
                    </div>
                    {expandedModules[chapter.id] ? (
                      <FiChevronUp className="text-gray-600" />
                    ) : (
                      <FiChevronDown className="text-gray-600" />
                    )}
                  </div>

                  {expandedModules[chapter.id] && (
                    <div className="divide-y divide-gray-100">
                      {chapter.lesson.length > 0 ? (
                        chapter.lesson.map((lesson) => (
                          <div key={lesson.id} className="border-t border-gray-100">
                            <div
                              className={`p-4 hover: cursor-pointer transition-colors ${
                                expandedLessons[lesson.id] ? '' : ''
                              }`}
                              onClick={() => toggleLesson(lesson.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full  flex items-center justify-center flex-shrink-0">
                                    <CiPlay1 className="text-blue-600 text-lg" />
                                  </div>
                                  <span className="font-medium text-gray-700">
                                    {lesson.order}. {lesson.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm px-3 py-1  text-blue-600 rounded-full font-medium">
                                    {lesson.duration} phút
                                  </span>
                                  {lesson.question.length > 0 && (
                                    <>
                                      {expandedLessons[lesson.id] ? (
                                        <FiChevronUp className="text-gray-500" />
                                      ) : (
                                        <FiChevronDown className="text-gray-500" />
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {expandedLessons[lesson.id] && lesson.question.length > 0 && (
                              <div className="p-5 mx-4 mb-4 rounded-lg  border border-blue-200 shadow-sm">
                                <ul className="space-y-3">
                                  {lesson.question.map((question, index) => (
                                    <li key={question.id} className="flex items-start gap-3">
                                      <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                                        <svg
                                          className="w-4 h-4 text-blue-500"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                      </div>
                                      <div className="text-gray-700">{question.name}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-500 italic">
                          Chương này chưa có bài học.
                        </div>
                      )}
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
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={course.course.thumbnail_url}
                  alt={course.course.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-green-800 px-2.5 py-0.5 rounded-full">
                    {parseFloat(course.course.price) === 0
                      ? 'Miễn phí'
                      : `${new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(
                          parseFloat(course.course.price)
                        )}`}
                  </div>
                </div>

                <button
                  className="w-full text-white py-3 px-4 rounded-lg font-medium bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 mb-6"
                  onClick={!isCanAddCourse ? () =>  navigateToCoursePlayer(id) : addCourseToCollection}
                  // disabled={!isCanAddCourse}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  {!isCanAddCourse ? 'Vào học' : 'Đăng ký học'}
                </button>

                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3 p-3 rounded-lg ">
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center flex-shrink-0">
                      <CiBookmark className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Số bài học</div>
                      <div className="font-medium text-gray-700">{totalLessons} bài học</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg ">
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center flex-shrink-0">
                      <CiClock2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Thời lượng</div>
                      <div className="font-medium text-gray-700">{totalMinutes} giờ</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg ">
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center flex-shrink-0">
                      <CiGrid41 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Truy cập</div>
                      <div className="font-medium text-gray-700">Học mọi lúc, mọi nơi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
