import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Table from './components/Table.jsx';
import Signup from './pages/Signup.jsx';
import AuthProvider, { useAuth } from './appwrite/AuthConfig.jsx';
import Menu from './pages/Menu.jsx';
import Signin from './pages/Signin.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import DashBoard from './pages/DashBoard.jsx';
import FoodReviewForm from './components/FoodReviewForm.jsx';
import BookTable from './pages/BookTable.jsx';
import SingleItem from './components/SingleItem.jsx';
import OrderedFood from './components/OrderedFood.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import Review from './components/Review.jsx';
import Contact from './pages/Contact.jsx';
import MyCard from './components/MyCard.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminOutlet from './components/AdminOutlet.jsx';
import NewOrders from './components/NewOrders.jsx';
import AdminTableHistory from './components/AdminTableHistory.jsx';
import AdminOrderHistory from './components/AdminOrderHistory.jsx';
import AddFood from './components/AddFood.jsx';

function Root() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        { 
          path: '/',
          element: <App></App>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        },
        {
          path: '/signin',
          element: <Signin></Signin>
        },
        {
          path: '/bookseat',
          element: <Table></Table>
        },
        {
          path:'/menu',
          element:<Menu></Menu>
        },
        {
        path:'/menu/:id',
        element:<SingleItem ></SingleItem>
        },
        {
          path:'/fooditem/:id',
          element:<SingleItem></SingleItem>
        },
        {
          path:'/menu/orderedlist',
          element:<OrderedFood ></OrderedFood>
        },
        {
          path:'/review',
          element:<FoodReviewForm></FoodReviewForm>
        },
        {
         path:'/contact',
         element:<Contact></Contact>
        },
        {
          path: '/dashboard',
          element: <DashBoard></DashBoard>,
          children: [
            {
              path: 'customer',
              element: <CustomerDashboard></CustomerDashboard>,
              children: [
                {
                 path:'',
                 element:<Menu ></Menu> 
                },
                {
                path:'orderhistory',
                element:<OrderHistory></OrderHistory>
                },
                {
                  path: 'orderfood',
                  element: <Menu ></Menu>
                },
                {
                 path:'orderfood/orderedlist',
                 element:<OrderedFood ></OrderedFood>
                },
                {
                  path: 'orderfood/:id',
                  element: <SingleItem ></SingleItem> 
                },
                {
                  path: 'booktable',
                  element: <BookTable></BookTable>
                },
                {
                  path: 'reviewfood',
                  element: <FoodReviewForm></FoodReviewForm>
                },
                {
                  path:'mycard',
                  element:<MyCard ></MyCard>

                },
                {
                  path:'updateprofile',
                  element:<UpdateProfile></UpdateProfile>
                }
              ]
            },
            {
              path:'admin',
              element:<AdminDashboard></AdminDashboard>,
              children:[
                {
                  path:'',
                  element:<AdminOutlet></AdminOutlet>
                },
                {
                  path:'neworder',
                  element:<NewOrders></NewOrders>

                },
                {
                  path:'foodmenu',
                  element:<Menu></Menu>
                },
                {
                  path:'foodmenu/:itemId',
                  element:<AddFood></AddFood>
                },
                {
                  path:'tablebooking',
                  element:<AdminTableHistory></AdminTableHistory>
                },
                {
                  path:'orderhistory',
                  element:<AdminOrderHistory></AdminOrderHistory>
                },
                {
                  path:'additem',
                  element:<AddFood></AddFood>
                },
                {
                  path:'updateprofile',
                  element:<UpdateProfile></UpdateProfile>
                }
              ]
            }
          ]
        }
      ]
    }
  ]);

  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode> 
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
