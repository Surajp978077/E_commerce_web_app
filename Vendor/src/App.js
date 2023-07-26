import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import { UserInfoProvider } from "./components/context_api/userInfo/UserInfoProvider";
import Test from "./Test";
import Navbar from "./components/Layout/Navbar";
import Lost from "./components/Common/Lost";
import VendorInfoProvider from "./components/context_api/vendorInfo/VendorInfoProvider";
import ErrorPage from "./components/Common/ErrorPage";
import NewListing from "./Pages/NewListing/NewListingPage";
import Test3 from "./Test3";
import ListingsPage from "./Pages/Listings/ListingsPage";
import RejectedQCPage from "./Pages/RejectedQC/RejectedQCPage";
import Footer from "./components/Layout/Footer";

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
        element: <ProfilePage />,
      },
      {
        path: "/listings/:tabNo?",
        element: <ListingsPage />,
      },
      {
        path: "new_listing",
        element: <NewListing />,
      },
      {
        path: "listings/rejectedQC",
        element: <RejectedQCPage />,
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
        <div className="App">
          <RouterProvider router={router} />
          <Footer />
        </div>
      </VendorInfoProvider>
    </UserInfoProvider>
  );
}

export default App;
