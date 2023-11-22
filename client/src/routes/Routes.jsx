import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Menu from '../pages/Menu/Menu'
import Container from '../components/Shared/Container'
import OrderFood from '../pages/Order/OrderFood'
import Dashboard from '../components/Dashboard/Dashboard'
import AllUsers from '../components/Dashboard/AdminDash/AllUsers'
import AdminRoute from './AdminRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

    ],
  },

  {
    path: '/menu',
    element: <Container><Menu></Menu></Container>,
  },

  {
    path: '/order',
    element: <OrderFood></OrderFood>,
  },

{
    path: '/dash',
    element: <Container><Dashboard></Dashboard></Container>,  

  },
 {
        path: '/users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
      },


  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
