import { Button } from 'antd'
import React from 'react'
import { CiBookmark, CiClock1, CiGift, CiUser } from 'react-icons/ci'
import { FaArrowRight } from 'react-icons/fa'

const StatSection = () => {
    const stats = [
        {
          icon: <CiUser className="w-8 h-8 text-white" />,
          value: "10,000+",
          label: "Học viên",
          color: "bg-primary-light",
        },
        {
          icon: <CiBookmark className="w-8 h-8 text-white" />,
          value: "200+",
          label: "Khóa học",
          color: "bg-secondary-light",
        },
        {
          icon: <CiGift className="w-8 h-8 text-white" />,
          value: "50+",
          label: "Giảng viên",
          color: "bg-primary-light",
        },
        {
          icon: <CiClock1 className="w-8 h-8 text-white" />,
          value: "5,000+",
          label: "Giờ học",
          color: "bg-secondary-light",
        },
      ]
    
      return (
        <section className="py-16 bg-gradient-to-r from-primary-light to-secondary-light">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Sẵn sàng bắt đầu hành trình học tập của bạn?</h2>
        <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
          Đăng ký ngay hôm nay để truy cập vào kho tàng kiến thức đa dạng với hơn 200+ khóa học chất lượng cao.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button type="primary" size="large" className="bg-white text-primary-light border-white hover:bg-gray-100">
            Đăng ký ngay
          </Button>
          <Button
            type="default"
            size="large"
            className="border-white text-white hover:bg-white hover:text-primary-light"
          >
            Xem khóa học <FaArrowRight className="ml-2 inline-block w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
      )
}

export default StatSection