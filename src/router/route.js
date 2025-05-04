import React from 'react';
import {createBrowserRouter, Outlet} from 'react-router-dom';
import {rootLoader} from "./rootLoader.js";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Home from "@/pages/Home";
import MyCourses from '@/pages/MyCourses/index.jsx';
import CourseDetailPage from '@/pages/CourseDetail/index.jsx';
import CoursePlayerPage from '@/pages/CoursePlayer/index.jsx';
import Kone from '@/pages/Kone/index.jsx';
import PaymentResultPage from '@/pages/PaymentResult/index.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_AUTH_PAGE'
    )
  },
  {
    path: '/',
    element: <Home/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, true, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/course-detail/:id',
    element: <CourseDetailPage/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_COURSES_PAGE'
    )
  },
  {
    path: '/my-courses',
    element: <MyCourses/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/course-player/:courseId',
    element: <CoursePlayerPage/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_HOME_PAGE'
    )
  },
  {
    path: '/kone',
    element: <Kone/>
  },
  {
    path: '/payment-result',
    element: <PaymentResultPage/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_COURSES_PAGE'
    )
  }
]);

export default router;

// client_id: 35030b5a-7152-41df-a84c-13e00ea3aa85
// secret_key: 2ebc26b17920462930afa2a31baf5a0fff109bca02941a6889807155e98aa42e
