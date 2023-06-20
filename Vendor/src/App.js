import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Card from "./components/About/Card";
import { UserInfoProvider } from "./components/context_api/userInfo/UserInfoProvider";
import Listings from "./components/listing/Listings";
import Test from "./Test";
import Navbar from "./components/Navbar";
import Lost from "./components/Lost";
import VendorInfoProvider from "./components/context_api/vendorInfo/VendorInfoProvider";
import NewListing from "./components/listing/new_listing/NewListing";

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
