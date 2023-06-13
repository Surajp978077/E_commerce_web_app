import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Root from './components/navigation/Root';
import Info from './components/userInfo/Info';
// import Home from './components/Home';
import { UserInfoProvider } from './components/userInfo/UserInfoProvider';
import Dashboard from './components/Dashboard';
import User from './components/User';
import Vendor from './components/Vendor';
import Category from './components/category/CategoryTest';
import { Product } from './components/product/Product';
import { ProductListing } from './components/product/ProductListing';
import Order from './components/Order';
import Offer from './components/Offer';
import { NotFound } from './components/NotFound';
import Navbar from './components/navigation/NavBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: 'profile',
        element: <Info />
      },
      {
        path: 'user',
        element: <User />
      },
      {
        path: 'vendor',
        element: <Vendor />
      },
      {
        path: 'category',
        element: <Category />
      },
      {
        path: 'product',
        element: <Product />
      },
      {
        path: 'product-listing',
        element: <ProductListing />
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: 'offer',
        element: <Offer />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
]);

function App() {
  return (
    <UserInfoProvider>
      <RouterProvider router={router} />
    </UserInfoProvider>
  );
}

export default App;
