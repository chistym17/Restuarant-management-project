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
import AllItems from '../components/Dashboard/AdminDash/AllItems'
import StripePay from '../components/Dashboard/Payment/StripePay'

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
    element: <Menu></Menu>,
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

 {
    path: '/items',
    element: <AllItems></AllItems>,
  },

 {
    path: '/pay',
    element: <StripePay></StripePay>,
  },



  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
