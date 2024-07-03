import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import SigninPage from './pages/Signin';
import RegisterationPage from './pages/Register';
import HomePage from './pages/Home';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mainTheme } from './theme/mainTheme';
import ReactQueryProvider from './Providers/ReactQueryProvider';
import Authware from './middleware/Authware';
import ErrorPage from './pages/ErrorPage';
import DashboardPage from './pages/Dashboard';
import CreateInterviewSessionPage from './pages/CreateInterviewSession';
import InterviewSessionsListPage from './pages/InterviewSessionsList';
import StartInterviewSessionPage from './pages/StartInterviewSession';
import { AuthProvider } from './Providers/AuthProvider/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Authware PageComponent={HomePage} />,
      },
      {
        path: "/dashboard",
        element: <Authware PageComponent={DashboardPage} />
      },
      {
        path: "/create-interview-session",
        element: <Authware PageComponent={CreateInterviewSessionPage} />
      },
      {
        path: "/interview-sessions-list",
        element: <Authware PageComponent={InterviewSessionsListPage} />
      },
    ]
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/start-interview/:id",
        element: <Authware PageComponent={StartInterviewSessionPage} />
      },
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signin",
        element: <Authware PageComponent={SigninPage} />,
      },
      {
        path: "/auth/signup",
        element: <Authware PageComponent={RegisterationPage} />
      },
    ],
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <ReactQueryProvider>
          <RouterProvider router={router} />
        </ReactQueryProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
