import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {rootLoader} from "./rootLoader.js";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Home from "@/pages/Home";

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
]);

export default router;
