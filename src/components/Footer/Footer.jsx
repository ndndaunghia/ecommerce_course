import React from 'react'
import IconLogo from '../../assets/images/logos/icon_zent.png';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
             src={IconLogo}
              className="w-12 rounded-lg"
              alt="Flowbite Logo"
            />
            <span className="text-xl font-semibold leading-6 bg-gradient-to-r from-[#006e4a] to-[#006E9A] bg-clip-text text-transparent">
              NVT Edu
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Chính sách
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Dịch vụ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            NghiaND
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer