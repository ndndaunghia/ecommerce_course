
import React from "react"
import { useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Làm thế nào để đăng ký khóa học?",
      answer:
        "Bạn có thể đăng ký khóa học bằng cách tạo tài khoản, sau đó chọn khóa học mong muốn và thanh toán. Sau khi thanh toán thành công, bạn sẽ có quyền truy cập vào nội dung khóa học ngay lập tức.",
    },
    {
      question: "Các phương thức thanh toán được chấp nhận?",
      answer:
        "Chúng tôi chấp nhận nhiều phương thức thanh toán bằng ví điện tử VNPAY",
    },
    {
      question: "Tôi có thể truy cập khóa học trong bao lâu?",
      answer:
        "Sau khi mua khóa học, bạn sẽ có quyền truy cập vĩnh viễn vào nội dung khóa học. Bạn có thể học theo tốc độ của riêng mình và xem lại bài học bất cứ khi nào.",
    },
    {
      question: "Có chính sách hoàn tiền không?",
      answer:
        "Có, chúng tôi cung cấp chính sách hoàn tiền trong vòng 7 ngày kể từ ngày mua khóa học nếu bạn không hài lòng với nội dung. Tuy nhiên, điều kiện là bạn chưa hoàn thành quá 30% khóa học.",
    },
    {
      question: "Làm thế nào để liên hệ với giảng viên?",
      answer:
        "Mỗi khóa học đều có phần bình luận và hỏi đáp, nơi bạn có thể đặt câu hỏi và nhận phản hồi từ giảng viên. Ngoài ra, chúng tôi cũng có diễn đàn và nhóm học tập để trao đổi.",
    },
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-12 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Câu hỏi thường gặp</h2>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-[#80cbc4] hover:bg-gray-100 transition-colors"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <FiChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {openIndex === index && (
              <div className="p-4 bg-white">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FaqSection
