import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import AboutPage from "./Pages/About/AboutPage";
import { UserInfoProvider } from "./components/context_api/userInfo/UserInfoProvider";
import Test from "./Test";
import Navbar from "./components/Layout/Navbar";
import Lost from "./components/Common/Lost";
import VendorInfoProvider from "./components/context_api/vendorInfo/VendorInfoProvider";
import ErrorPage from "./components/Common/ErrorPage";
import NewListing from "./Pages/NewListing/NewListingPage";
import Test3 from "./Test3";
import QCRejectedItem from "./Pages/QCRejectedItem";
import ListingsPage from "./Pages/Listings/ListingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <AboutPage />,
      },
      {
        path: "/listings/",
        element: <ListingsPage />,
        children: [],
      },
      {
        path: "new_listing",
        element: <NewListing />,
      },
      {
        path: "listings/rejectedQC",
        element: <QCRejectedItem />,
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
