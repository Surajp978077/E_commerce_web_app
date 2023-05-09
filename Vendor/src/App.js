import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Root from "./components/Root";
import Card from "./components/About/Card";
import { UserInfoProvider } from "./components/userInfo/UserInfoProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Profile",
        element: <Card />,
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
