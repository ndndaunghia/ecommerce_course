import React from 'react';
import ReactDOM from 'react-dom/client';
import Chart from "chart.js/auto";
import router from './router/route.js';
import store from './states/configureStore';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {CategoryScale} from "chart.js";
import 'animate.css';
import './index.scss';
import "tw-elements-react/dist/css/tw-elements-react.min.css";

Chart.register(CategoryScale);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

reportWebVitals();
