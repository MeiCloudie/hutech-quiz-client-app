// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc'
console.log(process.env.REACT_APP_HUTECH_CLASSROOM_BASE_URL)
console.log(process.env.REACT_APP_HUTECH_CLASSROOM_HUBS)
console.log(process.env.REACT_APP_TINYMCE_API_KEY)
console.log(process.env.REACT_APP_HUTECH_QUIZ_BASE_URL)
console.log(process.env.REACT_APP_HUTECH_QUIZ_HUBS)
dayjs.extend(dayjsPluginUTC)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();