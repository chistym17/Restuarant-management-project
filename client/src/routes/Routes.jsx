import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Menu from '../pages/Menu/Menu'
import Container from '../components/Shared/Container'

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
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
