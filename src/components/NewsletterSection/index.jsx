import React from "react"
import { Button } from "antd"
import { CiMail } from "react-icons/ci"

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-[#e3f2fd]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-2">Đăng ký nhận thông tin</h2>
              <p className="text-gray-600">
                Nhận thông báo về khóa học mới, ưu đãi đặc biệt và các mẹo học tập hữu ích.
              </p>
            </div>

            <div className="md:w-1/3 w-full">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <Button
                  type="primary"
                  className="rounded-r-md flex items-center justify-center"
                  icon={<CiMail className="w-4 h-4" />}
                >
                  Đăng ký
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection
