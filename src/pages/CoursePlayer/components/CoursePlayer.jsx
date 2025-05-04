import React, { useState, useEffect, useCallback } from 'react';
import { CiCircleChevLeft, CiCircleChevDown, CiPlay1, CiLock } from 'react-icons/ci';
import { FaLock, FaLockOpen, FaVideo, FaQuestion } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, checkedLesson } from '@/api/learn_course';
import { getCourse } from '@/api/courses';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const course = useSelector((state) => state.course?.course?.course || null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState({ type: null, data: null });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});

  const fetchCourse = useCallback(async () => {
    try {
      setIsLoading(true);
      if (courseId) {
        const action = await dispatch(getCourse(parseInt(courseId)));
        if (!action.payload) throw new Error('Failed to fetch course data');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    fetchCourse(); // Luôn gọi API khi component mount hoặc courseId thay đổi
  }, [courseId, fetchCourse]);

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleContentSelect = async (type, data) => {
    if (!data.is_unlocked) return;

    setSelectedContent({ type, data });

    if (type === 'lesson' && !data.is_checked && courseId) {
      try {
        await dispatch(checkedLesson(data.id.toString()));
        await fetchCourse(); // Cập nhật dữ liệu khóa học sau khi xem video
      } catch (error) {
        console.error('Error checking lesson:', error);
      }
    }
  };

  const handleOptionChange = (optionId) => {
    const correctOptionsCount = selectedContent.data?.count_correct_option || 1;
    const inputType = correctOptionsCount > 1 ? 'checkbox' : 'radio';

    if (inputType === 'checkbox') {
      setSelectedOptions((prev) =>
        prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedOptions.length === 0) {
      alert('Vui lòng chọn ít nhất một câu trả lời');
      return;
    }

    const optionsString = selectedOptions.join(',');
    const questionId = selectedContent.data.id.toString();

    try {
      const result = await dispatch(answerQuestion(questionId, optionsString));
      if (result.status === 200) { // Kiểm tra payload từ Redux
        alert('Chúc mừng! Bạn đã trả lời đúng');
        await fetchCourse(); // Cập nhật dữ liệu khóa học sau khi trả lời đúng
        setSelectedOptions([]);
      } else {
        alert('Rất tiếc, câu trả lời chưa chính xác');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const findNextContent = () => {
    if (!course || !selectedContent.data) return null;
    let foundCurrent = false;
    for (const module of course.module || []) {
      for (const lesson of module.lesson || []) {
        if (foundCurrent && lesson.is_unlocked) {
          return { type: 'lesson', data: lesson };
        }
        if (selectedContent.type === 'lesson' && lesson.id === selectedContent.data.id) {
          foundCurrent = true;
          for (const question of lesson.question || []) {
            if (question.is_unlocked) {
              return { type: 'question', data: question };
            }
          }
        }
        for (const question of lesson.question || []) {
          if (foundCurrent && question.is_unlocked) {
            return { type: 'question', data: question };
          }
          if (selectedContent.type === 'question' && question.id === selectedContent.data.id) {
            foundCurrent = true;
          }
        }
      }
    }
    return null;
  };

  const findPreviousContent = () => {
    if (!course || !selectedContent.data) return null;
    let previousContent = null;
    for (const module of course.module || []) {
      for (const lesson of module.lesson || []) {
        if (selectedContent.type === 'lesson' && lesson.id === selectedContent.data.id) {
          return previousContent;
        }
        if (lesson.is_unlocked) {
          previousContent = { type: 'lesson', data: lesson };
        }
        for (const question of lesson.question || []) {
          if (selectedContent.type === 'question' && question.id === selectedContent.data.id) {
            return previousContent;
          }
          if (question.is_unlocked) {
            previousContent = { type: 'question', data: question };
          }
        }
      }
    }
    return previousContent;
  };

  const handleNextContent = () => {
    const nextContent = findNextContent();
    if (nextContent) {
      handleContentSelect(nextContent.type, nextContent.data);
    }
  };

  const handlePreviousContent = () => {
    const previousContent = findPreviousContent();
    if (previousContent) {
      handleContentSelect(previousContent.type, previousContent.data);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Đang tải nội dung...</p>
          </div>
        </div>
      );
    }

    if (!course) {
      return (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Không tìm thấy khóa học. Vui lòng thử lại.</p>
        </div>
      );
    }

    if (!selectedContent.type) {
      return (
        <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-medium mb-4">Chọn bài học để bắt đầu</h2>
            <p className="text-gray-500">Hãy chọn một bài học từ danh sách bên phải để bắt đầu học</p>
          </div>
        </div>
      );
    }

    if (selectedContent.type === 'lesson') {
      return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative bg-gray-900 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={selectedContent.data.video_url}
              title={selectedContent.data.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-medium">{selectedContent.data.name}</h2>
            <p className="mt-2 text-gray-600">{selectedContent.data.description}</p>
          </div>
        </div>
      );
    }

    if (selectedContent.type === 'question') {
      const correctOptionsCount = selectedContent.data.count_correct_option || 1;
      const inputType = correctOptionsCount > 1 ? 'checkbox' : 'radio';

      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-medium mb-4">{selectedContent.data.name}</h2>
          <p className="mb-6 text-gray-600">{selectedContent.data.description}</p>
          <div className="space-y-3 mb-6">
            {selectedContent.data.options.map((option) => (
              <div key={option.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <label className="flex items-center cursor-pointer">
                  <input
                    type={inputType}
                    name="question-options"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleOptionChange(option.id)}
                    className="mr-3 h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">{option.content}</span>
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswer}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Kiểm tra đáp án
          </button>
        </div>
      );
    }
  };

  if (!course && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Không tìm thấy khóa học.</p>
      </div>
    );
  }

  const totalLessons = course?.module?.reduce((total, mod) => total + (mod.lesson?.length || 0), 0) || 0;
  const completedLessons = course?.module?.reduce(
    (total, mod) => total + (mod.lesson?.filter((l) => l.is_checked)?.length || 0),
    0
  ) || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const previousContent = findPreviousContent();
  const nextContent = findNextContent();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleNavigateBack}
            className="p-1 rounded-full hover:bg-blue-700 transition-colors"
          >
            <CiCircleChevLeft size={24} />
          </button>
          <h1 className="text-lg md:text-xl font-medium">{course?.name || 'Khóa học'}</h1>
        </div>
        <div className="flex items-center space-x-4 text-sm md:text-base">
          <span>{progressPercentage}%</span>
          <span>{completedLessons}/{totalLessons} bài học</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row pb-16">
        <div className="w-full md:w-2/3 lg:w-3/4 p-4">{renderContent()}</div>
        <div className="w-full md:w-1/3 lg:w-1/4 border-l overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-medium mb-4">Nội dung khóa học</h2>
            <div className="space-y-2">
              {course?.module?.map((module) => (
                <div key={module.id} className="border rounded-lg">
                  <div
                    className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleSection(module.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate">
                        {module.order || module.id}. {module.name}
                      </span>
                      <div className="text-sm text-gray-500">{module.lesson?.length || 0} bài học</div>
                    </div>
                    <CiCircleChevDown className="w-5 h-5 flex-shrink-0 ml-2" />
                  </div>
                  {(expandedSections[module.id] || false) && (
                    <div className="border-t">
                      {module.lesson?.map((lesson) => (
                        <div key={lesson.id}>
                          <div
                            className={`p-3 pl-6 flex items-center border-t cursor-pointer ${
                              lesson.is_unlocked ? 'hover:bg-gray-50' : 'opacity-60 cursor-not-allowed'
                            } ${selectedContent.data?.id === lesson.id ? 'bg-blue-50' : ''}`}
                            onClick={() => handleContentSelect('lesson', lesson)}
                          >
                            <div className="flex items-center space-x-2 flex-1 min-w-0">
                              <FaVideo className="w-4 h-4 text-blue-600 flex-shrink-0" />
                              <span className="truncate">{lesson.name}</span>
                            </div>
                            {lesson.is_checked ? (
                              <FaLockOpen className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                            ) : lesson.is_unlocked ? (
                              <CiPlay1 className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                            ) : (
                              <FaLock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                            )}
                          </div>
                          {lesson.question?.map((question) => (
                            <div
                              key={question.id}
                              className={`p-3 pl-10 flex items-center border-t ml-4 ${
                                question.is_unlocked
                                  ? 'hover:bg-gray-50 cursor-pointer'
                                  : 'opacity-60 cursor-not-allowed'
                              } ${selectedContent.data?.id === question.id ? 'bg-blue-50' : ''}`}
                              onClick={() => handleContentSelect('question', question)}
                            >
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <FaQuestion className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <span className="truncate">{question.name}</span>
                              </div>
                              {question.is_checked ? (
                                <FaLockOpen className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                              ) : question.is_unlocked ? null : (
                                <FaLock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                              )}
                            </div>
                          ))}
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <button
          className={`px-4 py-2 border rounded ${
            previousContent ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={previousContent ? handlePreviousContent : undefined}
          disabled={!previousContent}
        >
          ← BÀI TRƯỚC
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            nextContent ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={nextContent ? handleNextContent : undefined}
          disabled={!nextContent}
        >
          BÀI TIẾP THEO →
        </button>
      </div>
    </div>
  );
};

export default CoursePlayer;