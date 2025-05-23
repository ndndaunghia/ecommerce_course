import React from 'react'
import { CiBeaker1, CiBookmark, CiCalculator1, CiPalette } from 'react-icons/ci'
import { FaAmericanSignLanguageInterpreting, FaCodeBranch } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"

const CategorySection = () => {
  const navigate = useNavigate()

  const categories = [
    {
      id: 1,
      name: "Lập trình",
      icon: <FaCodeBranch className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600",
      count: 24,
    },
    {
      id: 2,
      name: "Toán học",
      icon: <CiCalculator1 className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600",
      count: 18,
    },
    {
      id: 4,
      name: "Hóa học",
      icon: <CiBeaker1 className="w-8 h-8" />,
      color: "bg-green-100 text-green-600",
      count: 15,
    },
    {
      id: 5,
      name: "Ngoại ngữ",
      icon: <FaAmericanSignLanguageInterpreting className="w-8 h-8" />,
      color: "bg-red-100 text-red-600",
      count: 20,
    },
  ]

  const handleCategoryClick = (categoryId) => {
    // Điều hướng đến trang danh sách khóa học theo danh mục
    navigate(`/courses?category=${categoryId}`)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Danh mục khóa học</h2>
        <p className="text-center text-gray-600 mb-12">Khám phá các danh mục khóa học đa dạng của chúng tôi</p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`${category.color} rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-105`}
            >
              <div className="mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm">{category.count} khóa học</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
