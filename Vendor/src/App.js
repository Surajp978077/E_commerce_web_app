import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Card from "./components/About/Card";
import { UserInfoProvider } from "./components/context_api/userInfo/UserInfoProvider";
import Listings from "./components/listing/Listings";
import Test from "./Test";
import Navbar from "./components/Navbar";
import Product from "./components/listing/Product";
import Lost from "./components/Lost";
import VendorInfoProvider from "./components/context_api/vendorInfo/VendorInfoProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <Lost />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Card />,
      },
      {
        path: "/listings/",
        element: <Listings />,
        children: [
          {
            path: "products/:id",
            element: <Product />,
          },
          {
            path: "new-product",
          },
        ],
      },
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

function App() {
  return (
    <UserInfoProvider>
      <VendorInfoProvider>
        <RouterProvider router={router} />
      </VendorInfoProvider>
    </UserInfoProvider>
  );
}

export default App;
