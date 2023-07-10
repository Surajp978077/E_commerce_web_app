import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Pages/home/Home";
import Card from "./components/Pages/About/Card";
import { UserInfoProvider } from "./components/context_api/userInfo/UserInfoProvider";
import Listings from "./components/Pages/listing/Listings";
import Test from "./Test";
import Navbar from "./components/Layout/Navbar";
import Lost from "./components/Pages/Lost";
import VendorInfoProvider from "./components/context_api/vendorInfo/VendorInfoProvider";
import ErrorPage from "./components/Pages/ErrorPage";
import NewListing from "./components/Pages/listing/new_listing/NewListing";
import Test3 from "./Test3";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
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
        children: [],
      },
      {
        path: "new_listing",
        element: <NewListing />,
      },

      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/test3",
        element: <Test3 />,
      },
      {
        path: "*",
        element: <Lost />,
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
