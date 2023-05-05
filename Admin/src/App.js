import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Components/navigation/Root';
import Info from './Components/userInfo/Info';
// import Home from './components/Home';
import UserInfoProvider from './Components/userInfo/UserInfoProvider';
import Dashboard from './Components/Dashboard';
import Customer from './Components/Customer';
import Vendor from './Components/Vendor';
import Category from './Components/Category';
import Product from './Components/Product';
import Order from './Components/Order';
import Offer from './Components/Offer';

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
