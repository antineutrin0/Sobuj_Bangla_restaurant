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

// Move useState inside a component like App
function Root() {
  const [orderDetail, setOrderDetail] = useState([]);

  const addToOrder = (item) => {
    setOrderDetail((prev) => {
      const itemIndex = prev.findIndex((order) => order.id === item.id);
      if (itemIndex === -1) {
        return [...prev, item];
      } else {
        const updatedOrder = [...prev];
        updatedOrder[itemIndex].quantity += item.quantity;
        return updatedOrder;
      }
    });
    console.log(orderDetail);
  };


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
          path: '/dashboard',
          element: <DashBoard></DashBoard>,
          children: [
            {
              path: 'customer',
              element: <CustomerDashboard></CustomerDashboard>,
              children: [
                {
                 path:'',
                 element:<Menu orderDetail={orderDetail}></Menu> 
                },
                {
                path:'orderhistory',
                element:<OrderHistory></OrderHistory>
                },
                {
                  path: 'orderfood',
                  element: <Menu orderDetail={orderDetail}></Menu>
                },
                {
                 path:'orderfood/orderedlist',
                 element:<OrderedFood orderDetail={orderDetail}></OrderedFood>
                },
                {
                  path: 'orderfood/:id',
                  element: <SingleItem addToOrder={addToOrder}></SingleItem> // Pass addToOrder as a prop
                },
                {
                  path: 'booktable',
                  element: <BookTable></BookTable>
                },
                {
                  path: 'reviewfood',
                  element: <FoodReviewForm></FoodReviewForm>
                }
              ]
            },
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
