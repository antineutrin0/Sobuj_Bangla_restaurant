import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      { 
        path:'/',
        element:<App></App>

      }
    ]
    }
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)

