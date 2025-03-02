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
    path: '/course-detail',
    element: <CourseDetailPage/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_HOME_PAGE'
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
    path: '/course-player',
    element: <CoursePlayerPage/>,
    loader: ({request, params}) => rootLoader(
      {request, params}, false, 'LOAD_HOME_PAGE'
    )
  },
]);

export default router;
