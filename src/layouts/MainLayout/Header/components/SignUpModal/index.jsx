import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '@/api/auth';
import {setIsSignUpModal, setIsLoginModal} from '@/states/modules/home';
import {setAuthToken, setUserId} from '@/utils/localStorage';

function SignUpModal() {
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: {errors: signUpErrors},
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const isLoadingBtnSignUp = useSelector((state) => state.auth.isLoadingBtnSignUp); // Trạng thái loading

  const password = watch('password');

  const onSignUpSubmit = handleSubmitSignUp(async (data) => {
    const signUpData = {
      email: data.email,
      password: data.password,
    };

    try {
      dispatch(signUp(signUpData));

      dispatch(setIsSignUpModal(false));
    } catch (error) {
      console.error('Sign up failed:', error); // Xử lý lỗi nếu cần
    }
  });

  return (
    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSignUpSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Tên đăng nhập
        </label>
        <input
          type="text"
          id="email"
          className="border border-gray-300 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nguyenvana@gmail.com"
          {...registerSignUp('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
        />
        <p className="text-sm text-grey italic mt-2 text-red-400">{signUpErrors?.email?.message}</p>
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Mật khẩu
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...registerSignUp('password', {
            required: 'Vui lòng nhập mật khẩu',
            minLength: {
              value: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự',
            },
          })}
        />
        <p className="text-sm text-grey italic mt-2 text-red-400">{signUpErrors?.password?.message}</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
          Xác nhận mật khẩu
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          className="border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...registerSignUp('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) => value === password || 'Mật khẩu không khớp',
          })}
        />
        <p className="text-sm text-grey italic mt-2 text-red-400">{signUpErrors?.confirmPassword?.message}</p>
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center text-white"
        disabled={isLoadingBtnSignUp} // Vô hiệu hóa nút khi đang loading
      >
        {isLoadingBtnSignUp ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>
      <p className="text-sm font-light text-gray-900 dark:text-gray-900">
        Bạn đã có tài khoản?{' '}
        <a
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          onClick={() => {
            dispatch(setIsSignUpModal(false));
            dispatch(setIsLoginModal(true));
          }}
        >
          Đăng nhập ngay
        </a>
      </p>
    </form>
  );
}

export default SignUpModal;
