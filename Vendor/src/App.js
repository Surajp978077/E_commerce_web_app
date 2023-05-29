import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import Card from "./components/About/Card";
import { UserInfoProvider } from "./components/userInfo/UserInfoProvider";
import Listings from "./components/listing/Listings";
import Test from "./Test";
import Navbar from "./components/Navbar";
import Product from "./components/listing/Product";
import Lost from "./components/Lost";

// const VendorRoutes = () => {
//   return (
//     <div>
//       <h1>Vendor Routes</h1>
//       <ul>
//         <li>
//           <a href="/Listings">Listings</a>
//         </li>
//         <li>
//           <a href="/Listings/products/:id">Products</a>
//         </li>
//       </ul>
//     </div>
//   );
// };

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
        path: "/Listings/products/:id",
        element: <Product />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      // {
      //   path: "/Listings/*",
      //   element: <VendorRoutes />,
      // },
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
      <RouterProvider router={router} />
    </UserInfoProvider>
  );
}

export default App;
