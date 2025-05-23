import React from 'react'
import { CiBookmark, CiGift, CiUser, CiVideoOn } from 'react-icons/ci'

const FeatureSection = () => {
  const features = [
    {
      icon: <CiBookmark className="w-10 h-10 text-primary-light" />,
      title: "Nội dung chất lượng",
      description: "Khóa học được biên soạn bởi các giảng viên hàng đầu với nội dung cập nhật liên tục.",
    },
    {
      icon: <CiVideoOn className="w-10 h-10 text-primary-light" />,
      title: "Video HD chất lượng cao",
      description: "Học tập với video chất lượng cao, rõ nét giúp việc học trở nên dễ dàng hơn.",
    },
    {
      icon: <CiGift className="w-10 h-10 text-primary-light" />,
      title: "Chứng chỉ công nhận",
      description: "Nhận chứng chỉ sau khi hoàn thành khóa học để nâng cao hồ sơ cá nhân.",
    },
    {
      icon: <CiUser className="w-10 h-10 text-primary-light" />,
      title: "Cộng đồng học tập",
      description: "Tham gia cộng đồng học tập sôi động để trao đổi và học hỏi cùng nhau.",
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn chúng tôi?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
