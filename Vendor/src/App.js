import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
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
//           <a href="/listings">Listings</a>
//         </li>
//         <li>
//           <a href="/listings/products/:id">Products</a>
//         </li>
//       </ul>
//     </div>
//   );
// };

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
        path: "/listings",
        element: <Listings />,
      },
      {
        path: "/listings/products/:id",
        element: <Product />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      // {
      //   path: "/listings/*",
      //   element: <VendorRoutes />,
      // },
      // {
      //   path: "*",
      //   element: <Lost />,
      // },
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
