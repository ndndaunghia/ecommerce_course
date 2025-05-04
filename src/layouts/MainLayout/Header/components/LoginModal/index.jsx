import {login, userDetail} from '@/api/auth';
import { setIsLoginModal, setIsSignUpModal } from '@/states/modules/home';
import { setAuthToken, setUserId } from '@/utils/localStorage';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';

function LoginModal() {
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: {errors: loginErrors},
  } = useForm();

  const dispatch = useDispatch();

  const onLoginSubmit = handleSubmitLogin(async (data) => { // Thêm async
    try {
      const response = await dispatch(login(data))
      const { token, user } = response.data.data;

      setAuthToken(token);
      setUserId(user.id);

      await dispatch(userDetail(user.id)); 

      dispatch(setIsLoginModal(false));
    } catch (error) {
      console.error('Login failed:', error);
    }
  });

  return (
    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onLoginSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-gray-900">
          Tên đăng nhập
        </label>
        <input
          type="text"
          id="email"
          className="border border-gray-300  sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="nguyenvana@gmail.com"
          {...registerLogin('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
        />
        <p className="text-sm text-grey italic mt-2 text-red-400">{loginErrors?.email?.message}</p>
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
          {...registerLogin('password', {
            required: 'Vui lòng nhập mật khẩu',
          })}
        />
        <p className="text-sm text-grey italic mt-2 text-red-400">{loginErrors?.password?.message}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-900 dark:text-gray-900">
              Ghi nhớ
            </label>
          </div>
        </div>
        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
          Quên mật khẩu?
        </a>
      </div>
      <button
        type="submit"
        className="w-full  bg-primary hover:bg-primary-light :bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center text-white"
      >
        Đăng nhập
      </button>
      <p className="text-sm font-light text-gray-900 dark:text-gray-900">
        Bạn chưa có tài khoản?{' '}
        <a
        onClick={() => {
          dispatch(setIsLoginModal(false));
          dispatch(setIsSignUpModal(true)); // Chuyển sang modal đăng ký
        }}
          href="#"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Đăng ký ngay
        </a>
      </p>
    </form>
  );
}

export default LoginModal;
