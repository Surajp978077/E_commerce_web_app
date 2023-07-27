import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserInfoProvider } from './components/userInfo/UserInfoProvider';
import { Navbar } from './layout/Navbar';
import { Dashboard } from './pages/dashboard/Dashboard';
import Info from './components/userInfo/Info';
import { QCRequest } from './pages/qcrequest/QCRequest';
import { QCRequestReview } from './pages/qcrequest-review/QCRequestReview';
import { User } from './pages/user/User';
import Vendor from './components/Vendor';
import Category from './components/category/Category';
import { Product } from './components/product/Product';
import { ProductDetails } from './components/product/ProductDetails';
import Order from './components/Order';
import Offer from './components/Offer';
import { NotFound } from './components/NotFound';
import { Test } from './pages/test/Test'

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
        path: 'qcrequest',
        element: <QCRequest />
      },
      {
        path: 'qcrequest/review',
        element: <QCRequestReview />
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
        path: 'product/details',
        element: <ProductDetails />
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
        path: 'test',
        element: <Test />
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
