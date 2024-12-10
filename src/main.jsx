import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Table from './pages/Table.jsx';
import Signup from './pages/Signup.jsx';
import AuthProvider, { useAuth } from './appwrite/AuthConfig.jsx';
import Menu from './pages/Menu.jsx';
import Signin from './pages/Signin.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import DashBoard from './pages/DashBoard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      { 
        path:'/',
        element:<App></App>
      },
      {
        path:'/signup',
        element:<Signup></Signup>
      },
      {
        path:'/signin',
        element:<Signin></Signin>

      },
      {
        path:'/menu',
        element:<Menu></Menu>
      },
      {
        path:'/bookseat',
        element:<Table></Table>
      },
      {
        path:'/dashboard',
        element:<DashBoard></DashBoard>,
       children:[
        {
          path:'customer',
          element:<CustomerDashboard></CustomerDashboard>,
          children:[
            {
              path:'orderfood',
              element:<Menu></Menu>
            }
          ]
        },
        {
          
        }
       ]
      }
    ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>,
)

