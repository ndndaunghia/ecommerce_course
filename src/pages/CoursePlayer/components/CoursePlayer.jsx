import React, { useState, useEffect, useCallback } from 'react';
import { CiCircleChevLeft, CiCircleChevDown, CiPlay1 } from 'react-icons/ci';
import { FaLock, FaLockOpen, FaVideo, FaQuestion, FaCheckCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, checkedLesson, unlockNextModule } from '@/api/learn_course';
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
        console.log('action', action);

        if (!action.data) throw new Error('Failed to fetch course data');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, dispatch]);

  // Memoize isModuleCompleted function
  const isModuleCompleted = useCallback((module) => {
    for (const lesson of module.lesson || []) {
      const lessonUserProgress = lesson.lesson_users?.[0];
      if (!lessonUserProgress?.is_checked) return false;
      for (const question of lesson.question || []) {
        const questionUserProgress = question.question_users?.[0];
        if (!questionUserProgress?.is_checked) return false;
      }
    }
    return true;
  }, []); // No dependencies since it only uses module structure

  useEffect(() => {
    fetchCourse();
  }, [courseId, fetchCourse]);

  // Tự động mở khóa và chọn bài học + câu hỏi đầu tiên khi vào khóa học
  useEffect(() => {
    if (course && !selectedContent.data) {
      let firstUnlockedContent = null;
      let firstLesson = null;
      let firstQuestion = null;
      let hasUnlockedContent = false;

      // Kiểm tra xem có nội dung nào đã mở khóa chưa
      for (const module of course.module || []) {
        for (const lesson of module.lesson || []) {
          const lessonUserProgress = lesson.lesson_users?.[0];
          if (lessonUserProgress?.is_unlocked) {
            hasUnlockedContent = true;
            firstUnlockedContent = { type: 'lesson', data: lesson };
            firstLesson = lesson;
            setExpandedSections((prev) => ({ ...prev, [module.id]: true }));
            firstQuestion = lesson.question?.[0];
            const questionUserProgress = firstQuestion?.question_users?.[0];
            if (firstQuestion && !questionUserProgress?.is_unlocked && !questionUserProgress?.is_checked) {
              dispatch(checkedLesson(lesson.id.toString()))
                .then(() => {
                  fetchCourse();
                })
                .catch((error) => {
                  console.error('Error checking lesson:', error);
                });
            }
            break;
          }
          for (const question of lesson.question || []) {
            const questionUserProgress = question.question_users?.[0];
            if (questionUserProgress?.is_unlocked) {
              hasUnlockedContent = true;
              firstUnlockedContent = { type: 'question', data: question };
              setExpandedSections((prev) => ({ ...prev, [module.id]: true }));
              break;
            }
          }
          if (hasUnlockedContent) break;
        }
        if (hasUnlockedContent) break;
      }

      // Nếu không có nội dung nào mở khóa, mở khóa bài học và câu hỏi đầu tiên
      if (!hasUnlockedContent && course.module?.length > 0) {
        const firstModule = course.module[0];
        firstLesson = firstModule.lesson?.[0];
        if (firstLesson) {
          dispatch(checkedLesson(firstLesson.id.toString()))
            .then(() => {
              fetchCourse();
              setExpandedSections((prev) => ({ ...prev, [firstModule.id]: true }));
              firstUnlockedContent = { type: 'lesson', data: firstLesson };
            })
            .catch((error) => {
              console.error('Error unlocking first lesson:', error);
            });
        }
      }

      // Kiểm tra và mở khóa module tiếp theo nếu module trước đã hoàn thành
      for (let i = 0; i < (course.module?.length || 0) - 1; i++) {
        const currentModule = course.module[i];
        if (isModuleCompleted(currentModule)) {
          const nextModule = course.module[i + 1];
          console.log(`Checking completion: Module ${currentModule.name} completed, unlocking ${nextModule.name}`);
          dispatch(unlockNextModule(currentModule.id))
            .then((result) => {
              console.log('Unlock next module result:', result);
              if (result.code === 200 && result.data && result.data.lesson_id) {
                fetchCourse(); // Làm mới dữ liệu sau khi mở khóa
                const firstLessonInNextModule = nextModule.lesson?.find(
                  (lesson) => lesson.id === result.data.lesson_id
                );
                if (firstLessonInNextModule) {
                  setExpandedSections((prev) => ({ ...prev, [nextModule.id]: true }));
                  setSelectedContent({ type: 'lesson', data: firstLessonInNextModule });
                }
              }
            })
            .catch((error) => {
              console.error('Error unlocking next module:', error);
            });
          break; // Chỉ mở khóa module tiếp theo đầu tiên nếu có nhiều module
        }
      }

      if (firstUnlockedContent) {
        setSelectedContent(firstUnlockedContent);
      }
    }
  }, [course, selectedContent.data, setExpandedSections, dispatch, fetchCourse, isModuleCompleted]);

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
    const userProgress = type === 'lesson' ? data.lesson_users?.[0] : data.question_users?.[0];
    if (!userProgress?.is_unlocked) {
      console.log(`${type} "${data.name}" is locked for this user.`);
      return;
    }
    setSelectedContent({ type, data });
    setSelectedOptions([]);
    if (type === 'lesson' && !userProgress.is_checked) {
      try {
        await dispatch(checkedLesson(data.id.toString()));
        await fetchCourse();
      } catch (error) {
        console.error('Error checking lesson:', error);
      }
    }
  };

  const handleOptionChange = (optionId) => {
    const correctOptionsCount = selectedContent.data?.correct_options_count || 1;
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
      console.log('API Result:', result);

      if (result.status === 200) {
        alert('Chúc mừng! Bạn đã trả lời đúng');

        // Cập nhật trạng thái is_checked của câu hỏi hiện tại trong selectedContent
        setSelectedContent((prev) => ({
          ...prev,
          data: {
            ...prev.data,
            question_users: [{ ...prev.data.question_users?.[0], is_checked: true }],
          },
        }));

        // Làm mới dữ liệu từ API
        await fetchCourse();
        setSelectedOptions([]);

        const nextContent = findNextContent();
        if (nextContent) {
          setTimeout(() => {
            handleContentSelect(nextContent.type, nextContent.data);
          }, 1000);
        } else {
          // Kiểm tra nếu module hiện tại đã hoàn thành
          const currentModule = course.module.find((mod) =>
            mod.lesson.some((les) => les.question.some((q) => q.id === selectedContent.data.id))
          );
          if (currentModule && isModuleCompleted(currentModule)) {
            console.log('Current module completed:', currentModule.name);
            const moduleIndex = course.module.findIndex((mod) => mod.id === currentModule.id);
            const nextModule = course.module[moduleIndex + 1];
            if (nextModule) {
              console.log('Attempting to unlock next module:', nextModule.name);
              try {
                const result = await dispatch(unlockNextModule(currentModule.id));
                console.log('Unlock module result:', result);

                if (result.code === 200 && result.data && result.data.lesson_id) {
                  await fetchCourse(); // Refresh course data

                  // Find the unlocked lesson
                  const firstLessonInNextModule = nextModule.lesson?.find(
                    (lesson) => lesson.id === result.data.lesson_id
                  );

                  if (firstLessonInNextModule) {
                    // Expand the module
                    setExpandedSections((prev) => ({ ...prev, [nextModule.id]: true }));

                    // Select the lesson
                    setTimeout(() => {
                      handleContentSelect('lesson', firstLessonInNextModule);
                    }, 1000);
                  }
                }
              } catch (error) {
                console.error('Failed to unlock next module:', error);
                alert('Không thể mở khóa module tiếp theo. Vui lòng thử lại sau.');
              }
            } else {
              alert('Chúc mừng! Bạn đã hoàn thành tất cả các module trong khóa học.');
            }
          }
        }
      } else {
        const errorMessage = result.payload?.message || 'Rất tiếc, câu trả lời chưa chính xác';
        alert(errorMessage);
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
        const lessonUserProgress = lesson.lesson_users?.[0];
        const isLessonUnlocked = lessonUserProgress?.is_unlocked;

        if (foundCurrent && isLessonUnlocked) {
          return { type: 'lesson', data: lesson };
        }
        if (selectedContent.type === 'lesson' && lesson.id === selectedContent.data.id) {
          foundCurrent = true;
          for (const question of lesson.question || []) {
            const questionUserProgress = question.question_users?.[0];
            const isQuestionUnlocked = questionUserProgress?.is_unlocked;
            if (isQuestionUnlocked) {
              return { type: 'question', data: question };
            }
          }
        }
        if (
          selectedContent.type === 'question' &&
          lesson.question?.find((q) => q.id === selectedContent.data.id)
        ) {
          foundCurrent = true;
        }
        for (const question of lesson.question || []) {
          const questionUserProgress = question.question_users?.[0];
          const isQuestionUnlocked = questionUserProgress?.is_unlocked;
          if (
            foundCurrent &&
            isQuestionUnlocked &&
            question.id !== (selectedContent.type === 'question' ? selectedContent.data.id : null)
          ) {
            return { type: 'question', data: question };
          }
          if (selectedContent.type === 'question' && question.id === selectedContent.data.id) {
            foundCurrent = true;
          }
        }
        if (
          selectedContent.type === 'question' &&
          lesson.question?.length > 0 &&
          lesson.question[lesson.question.length - 1].id === selectedContent.data.id
        ) {
          foundCurrent = true;
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
        const lessonUserProgress = lesson.lesson_users?.[0];
        const isLessonUnlocked = lessonUserProgress?.is_unlocked;

        if (selectedContent.type === 'lesson' && lesson.id === selectedContent.data.id) {
          return previousContent;
        }

        if (isLessonUnlocked) {
          previousContent = { type: 'lesson', data: lesson };
        }

        for (const question of lesson.question || []) {
          const questionUserProgress = question.question_users?.[0];
          const isQuestionUnlocked = questionUserProgress?.is_unlocked;

          if (selectedContent.type === 'question' && question.id === selectedContent.data.id) {
            return previousContent;
          } else if (isQuestionUnlocked) {
            previousContent = { type: 'question', data: question };
          }
        }
        if (isLessonUnlocked) {
          previousContent = { type: 'lesson', data: lesson };
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
      const lessonUserProgress = selectedContent.data.lesson_users?.[0];
      const isLessonUnlocked = lessonUserProgress?.is_unlocked;
      const isLessonChecked = lessonUserProgress?.is_checked;

      if (!isLessonUnlocked) {
        return (
          <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <FaLock size={40} className="text-gray-400 mb-4 mx-auto" />
              <h2 className="text-xl font-medium mb-2">Bài học bị khóa</h2>
              <p className="text-gray-500">Vui lòng hoàn thành các bài học trước để mở khóa nội dung này.</p>
            </div>
          </div>
        );
      }

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
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-medium">{selectedContent.data.name}</h2>
              {isLessonChecked ? (
                <span className="flex items-center text-green-600">
                  <FaCheckCircle className="mr-1" /> Đã hoàn thành
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-gray-600">{selectedContent.data.description}</p>
            {!isLessonChecked && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">
                  Bài học đã được đánh dấu là đã xem. Bạn có thể xem video và sau đó chuyển tới nội dung tiếp
                  theo.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (selectedContent.type === 'question') {
      const questionUserProgress = selectedContent.data.question_users?.[0];
      const isQuestionUnlocked = questionUserProgress?.is_unlocked;
      const isQuestionChecked = questionUserProgress?.is_checked;

      if (!isQuestionUnlocked) {
        return (
          <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-8">
              <FaLock size={40} className="text-gray-400 mb-4 mx-auto" />
              <h2 className="text-xl font-medium mb-2">Câu hỏi bị khóa</h2>
              <p className="text-gray-500">
                Vui lòng hoàn thành bài học trước hoặc các câu hỏi trước để mở khóa nội dung này.
              </p>
            </div>
          </div>
        );
      }

      const correctOptionsCount = selectedContent.data.correct_options_count || 1;
      const inputType = correctOptionsCount > 1 ? 'checkbox' : 'radio';

      return (
        <div className="bg-white rounded-lg shadow-sm p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">{selectedContent.data.name}</h2>
            {isQuestionChecked && (
              <span className="flex items-center text-green-600">
                <FaCheckCircle className="mr-1" /> Đã hoàn thành
              </span>
            )}
          </div>
          {selectedContent.data.image_url && (
            <img
              src={selectedContent.data.image_url}
              alt="Question related image"
              className="max-w-full h-auto mb-4 rounded-lg"
            />
          )}
          <p className="mb-6 text-gray-600">{selectedContent.data.description}</p>
          <div className="space-y-3 mb-6">
            {selectedContent.data.options?.map((option) => (
              <div
                key={option.id}
                className={`p-3 border rounded-lg ${
                  isQuestionChecked && option.is_correct
                    ? 'bg-green-100 border-green-500'
                    : selectedOptions.includes(option.id)
                    ? 'bg-blue-50 border-blue-300'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type={inputType}
                    name="question-options"
                    checked={selectedOptions.includes(option.id) || (isQuestionChecked && option.is_correct)}
                    onChange={() => handleOptionChange(option.id)}
                    className="mr-3 h-4 w-4 text-blue-600"
                    disabled={isQuestionChecked}
                  />
                  <span
                    className={`text-gray-700 ${
                      isQuestionChecked && option.is_correct ? 'font-medium text-green-700' : ''
                    }`}
                  >
                    {option.content}
                  </span>
                </label>
                {isQuestionChecked && option.is_correct && option.explanation && (
                  <div className="mt-2 ml-7 text-sm text-green-600 italic">{option.explanation}</div>
                )}
              </div>
            ))}
          </div>
          {!isQuestionChecked && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptions.length === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedOptions.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Kiểm tra đáp án
            </button>
          )}
          {isQuestionChecked && selectedContent.data.options?.some((opt) => opt.explanation) && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Giải thích đáp án:</h4>
              {selectedContent.data.options
                .filter((opt) => opt.is_correct && opt.explanation)
                .map((opt) => (
                  <p key={opt.id} className="text-blue-700 mb-1">
                    <span className="font-medium">{opt.content}:</span> {opt.explanation}
                  </p>
                ))}
            </div>
          )}
        </div>
      );
    }
  };

  const totalLessons = course?.module?.reduce((total, mod) => total + (mod.lesson?.length || 0), 0) || 0;
  const completedLessons =
    course?.module?.reduce(
      (total, mod) => total + (mod.lesson?.filter((l) => l.lesson_users?.[0]?.is_checked)?.length || 0),
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
          <span>
            {completedLessons}/{totalLessons} bài học
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <div
          className="w-full md:w-2/3 lg:w-3/4 p-4 flex justify-center overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        >
          <div className="w-full max-w-4xl">{renderContent()}</div>
        </div>
        <div
          className="w-full md:w-1/3 lg:w-1/4 border-l overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 160px)' }}
        >
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
                    <CiCircleChevDown
                      className={`w-5 h-5 flex-shrink-0 ml-2 transform ${
                        expandedSections[module.id] ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </div>
                  {(expandedSections[module.id] || false) && (
                    <div className="border-t">
                      {module.lesson?.map((lesson) => {
                        const lessonUserProgress = lesson.lesson_users?.[0];
                        const isLessonUnlocked = lessonUserProgress?.is_unlocked;
                        const isLessonChecked = lessonUserProgress?.is_checked;

                        return (
                          <div key={lesson.id}>
                            <div
                              className={`p-3 pl-6 flex items-center border-t cursor-pointer ${
                                isLessonUnlocked ? 'hover:bg-gray-50' : 'opacity-60 cursor-not-allowed'
                              } ${
                                selectedContent.data?.id === lesson.id && selectedContent.type === 'lesson'
                                  ? 'bg-blue-50'
                                  : ''
                              }`}
                              onClick={() => handleContentSelect('lesson', lesson)}
                            >
                              <div className="flex items-center space-x-2 flex-1 min-w-0">
                                <FaVideo className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <span className="truncate">{lesson.name}</span>
                              </div>
                              {isLessonChecked ? (
                                <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                              ) : isLessonUnlocked ? (
                                <CiPlay1 className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                              ) : (
                                <FaLock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                              )}
                            </div>
                            {lesson.question?.map((question) => {
                              const questionUserProgress = question.question_users?.[0];
                              const isQuestionUnlocked = questionUserProgress?.is_unlocked;
                              const isQuestionChecked = questionUserProgress?.is_checked;

                              return (
                                <div
                                  key={question.id}
                                  className={`p-3 pl-10 flex items-center border-t ml-4 ${
                                    isQuestionUnlocked
                                      ? 'hover:bg-gray-50 cursor-pointer'
                                      : 'opacity-60 cursor-not-allowed'
                                  } ${
                                    selectedContent.data?.id === question.id &&
                                    selectedContent.type === 'question'
                                      ? 'bg-blue-50'
                                      : ''
                                  }`}
                                  onClick={() => handleContentSelect('question', question)}
                                >
                                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                                    <FaQuestion className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                    <span className="truncate">{question.name}</span>
                                  </div>
                                  {isQuestionChecked ? (
                                    <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" />
                                  ) : isQuestionUnlocked ? null : (
                                    <FaLock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
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
          onClick={previousContent ? () => handlePreviousContent() : undefined}
          disabled={!previousContent}
        >
          ← BÀI TRƯỚC
        </button>
        <button
          className={`px-4 py-2 text-white rounded ${
            nextContent ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={nextContent ? () => handleNextContent() : undefined}
          disabled={!nextContent}
        >
          BÀI TIẾP THEO →
        </button>
        {/* <button
          onClick={async () => {
            try {
              console.log('Testing unlock module API for module ID:', 3); // Thay ID module 1
              const response = await dispatch(unlockNextModule(3)); // Thay ID module 1
              alert('API test completed - check console for results');
              console.log('API test response:', response);
            } catch (error) {
              console.error('Test API error:', error);
              alert('API test failed - see console');
            }
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Test Unlock Module API
        </button> */}
      </div>
    </div>
  );
};

export default CoursePlayer;