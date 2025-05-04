import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setIsLoginModal, setIsSignUpModal } from '@/states/modules/home';
import ImageUser from '@/assets/images/logos/user_default.png';
import IconLogo from '@/assets/images/logos/icon_zent.png';
import contentInfo from './components/PopoverProfile';
import ModalDefault from '@/components/Modal';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';

const Header = () => {
  const isAuthSuccess = useSelector((state) => state.auth.isAuthSuccess);
  const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State quản lý menu mobile

  const isOpenLoginModal = useSelector((state) => state.home.isOpenLoginModal);
  const isOpenSignUpModal = useSelector((state) => state.home.isOpenSignUpModal);

  const handleOpenLoginModal = () => {
    dispatch(setIsLoginModal(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsLoginModal(false));
    dispatch(setIsSignUpModal(false));
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Đóng menu sau khi nhấp vào liên kết
  };

  // Hàm kiểm tra trang hiện tại
  const isActive = (path) => location.pathname === path;
 console.log(location.pathname === '/my-courses')
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left - Logo và nút menu */}
      <div className="flex items-center">
        {/* Nút menu hamburger - Chỉ hiển thị trên mobile */}
        <div
          className="md:hidden mr-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="flex flex-col space-y-1">
            <span className="w-6 h-0.5 bg-gray-600"></span>
            <span className="w-6 h-0.5 bg-gray-600"></span>
            <span className="w-6 h-0.5 bg-gray-600"></span>
          </div>
        </div>

        {/* Logo */}
        <div className="cursor-pointer" onClick={() => navigate('/')}>
          <img src={IconLogo} alt="Logo" className="h-8" />
        </div>
      </div>

      {/* Menu mobile - Hiển thị khi nhấp vào nút menu */}
      {isMenuOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a
              href="/"
              className={`text-gray-700 font-medium ${
                isActive('/') ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
            >
              Trang chủ
            </a>
            <a
              href="/courses"
              className={`text-gray-700 font-medium ${
                isActive('/courses') ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/courses');
              }}
            >
              Danh sách khóa học
            </a>
            <a
              href="/my-courses"
              className={`text-gray-700 font-medium ${
                isActive('/my-courses') ? 'text-blue-600' : 'hover:text-blue-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/my-courses');
              }}
            >
              Khóa học của tôi
            </a>
          </div>
        </div>
      )}

      {/* Center - Navigation links (Desktop) */}
      <nav className="hidden md:flex items-center justify-center flex-1">
        <div className="flex space-x-8">
          <a
            href="/"
            className={`text-gray-700 font-medium ${
              isActive('/') ? 'text-blue-600' : 'hover:text-blue-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
          >
            Trang chủ
          </a>
          <a
            href="/courses"
            className={`text-gray-700 font-medium ${
              isActive('/courses') ? 'text-blue-600' : 'hover:text-blue-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/courses');
            }}
          >
            Danh sách khóa học
          </a>
          <a
            href="/my-courses"
            className={`text-gray-700 font-medium ${
              isActive('/my-courses') ? 'text-blue-600' : 'hover:text-blue-600'
            }`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/my-courses');
            }}
          >
            Khóa học của tôi
          </a>
        </div>
      </nav>

      {/* Right - User profile hoặc nút đăng nhập */}
      <div className="flex items-center">
        {isAuthSuccess ? (
          <Popover content={contentInfo} placement="bottomRight">
            <div className="flex items-center cursor-pointer">
              <span className="mr-2">{authUser?.user?.email}</span>
              <img
                src={authUser?.avatar || ImageUser}
                alt="User"
                className="h-8 w-8 rounded-full"
              />
            </div>
          </Popover>
        ) : (
          <Button
            type="default"
            onClick={handleOpenLoginModal}
            size="large"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng nhập
          </Button>
        )}
      </div>

      {/* Modals */}
      <ModalDefault isModalOpen={isOpenLoginModal} handleCancel={handleCloseModal} title="Đăng nhập">
        <LoginModal />
      </ModalDefault>

      <ModalDefault isModalOpen={isOpenSignUpModal} handleCancel={handleCloseModal} title="Đăng ký">
        <SignUpModal />
      </ModalDefault>
    </header>
  );
};

export default Header;