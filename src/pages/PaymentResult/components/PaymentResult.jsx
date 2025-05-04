import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiCheck, FiList } from "react-icons/fi";
import { CiBookmark } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { startGetMyCourses } from "@/states/modules/courses";
import { getUserId } from "@/utils/localStorage";
import { getMyCourses } from "@/api/courses";

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [courseId, setCourseId] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const vnp_Amount = queryParams.get("vnp_Amount");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");

  useEffect(() => {
    // Lưu courseId vào state ngay khi component render
    const storedCourseId = localStorage.getItem("pending_course_id");
    if (storedCourseId) {
      setCourseId(storedCourseId);
    }

    // Format ngày hiện tại
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setCurrentDate(`${day}/${month}/${year}`);

    const savePurchasedCourse = async () => {
      if (vnp_ResponseCode === "00" && storedCourseId) {
        try {
          setIsProcessing(true);
          setError("");

          await axios.post(
            "http://127.0.0.1:8000/api/v1.0/save-purchased-course",
            {
              course_id: storedCourseId,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          // Không xóa localStorage ngay lập tức
          // localStorage.removeItem("pending_course_id");
          await dispatch(getMyCourses(getUserId()));
        } catch (error) {
          console.error("Error saving purchase:", error);
          setError("Có lỗi xảy ra khi lưu khóa học. Vui lòng liên hệ hỗ trợ.");
        } finally {
          setIsProcessing(false);
        }
      }
    };

    savePurchasedCourse();
  }, [vnp_ResponseCode, dispatch]);

  // Xóa localStorage chỉ khi người dùng rời khỏi trang
  useEffect(() => {
    return () => {
      if (vnp_ResponseCode === "00") {
        localStorage.removeItem("pending_course_id");
      }
    };
  }, [vnp_ResponseCode]);

  // Clean up localStorage if payment failed
  useEffect(() => {
    if (vnp_ResponseCode !== "00") {
      localStorage.removeItem("pending_course_id");
    }
  }, [vnp_ResponseCode]);

  const handleViewCourseDetail = () => {
    if (courseId) {
      navigate(`/course-detail/${courseId}`);
    } else {
      alert("Không tìm thấy thông tin khóa học. Vui lòng kiểm tra tại danh sách khóa học đã mua.");
      navigate('/my-courses');
    }
  };

  if (vnp_ResponseCode === "00") {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <FiCheck size={32} className="text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-green-600">Thanh toán thành công!</h1>
              <p className="text-gray-600 mt-2 text-center">
                Cảm ơn bạn đã mua khóa học. Đơn hàng của bạn đã được xác nhận.
              </p>
            </div>

            {isProcessing ? (
              <div className="text-center mb-4">
                <p className="text-gray-600">Đang xử lý...</p>
              </div>
            ) : error ? (
              <div className="text-center mb-4">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <>
                {/* Order Summary */}
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Mã giao dịch:</span>
                    <span className="font-medium">{vnp_TxnRef}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Ngày đặt hàng:</span>
                    <span>{currentDate}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tổng thanh toán:</span>
                    <span className="font-bold">{parseInt(vnp_Amount || "0") / 100} VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương thức thanh toán:</span>
                    <span>VNPay</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center shadow-md"
                    onClick={handleViewCourseDetail}
                  >
                    <CiBookmark size={18} className="mr-2" />
                    Xem chi tiết khóa học
                  </button>
                  <button 
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg flex items-center justify-center border border-gray-300"
                    onClick={() => navigate(`/my-courses`)}
                  >
                    <FiList size={18} className="mr-2" />
                    Danh sách khóa học đã mua
                  </button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Thanh toán thất bại
            </h1>
            <p className="text-gray-600 mb-6">Vui lòng thử lại sau.</p>
            <button
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              onClick={() => navigate(`/course-detail/${courseId}`)}
            >
              Quay lại
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentResult;