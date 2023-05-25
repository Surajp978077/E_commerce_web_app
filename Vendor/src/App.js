import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Card from "./components/About/Card";
import { UserInfoProvider } from "./components/userInfo/UserInfoProvider";
import Listings from "./components/listing/Listings";
import Test from "./Test";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Profile",
        element: <Card />,
      },
      {
        path: "/Listings",
        element: <Listings />,
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
      <RouterProvider router={router} />
    </UserInfoProvider>
  );
}

export default App;
