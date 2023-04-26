import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Info from './components/Info';
// import Home from './components/Home';
import UserInfoProvider from './components/UserInfoProvider';
import Dashboard from './components/Dashboard';
import Customer from './components/Customer';
import Vendor from './components/Vendor';
import Category from './components/Category';
import Product from './components/product/Product';
import Order from './components/Order';
import Offer from './components/Offer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/profile',
        element: <Info />
      },
      {
        path: '/customer',
        element: <Customer />
      },
      {
        path: '/vendor',
        element: <Vendor />
      },
      {
        path: '/category',
        element: <Category />
      },
      {
        path: '/product',
        element: <Product />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/offer',
        element: <Offer />
      },
    ]
  }
])

function App() {
  return (
    <UserInfoProvider>
      <RouterProvider router={router} />
    </UserInfoProvider>
  );
}

export default App;
