import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
<<<<<<< HEAD
import Root from './components/Root';
import Info from './components/Info';
import Home from './components/Home';
=======
import Root from './Components/Root';
import Info from './Components/Info';
import Home from './Components/Home';
>>>>>>> 11ce597e3b6138237ca770e45a6159baa8f6d6c0

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <Info />
      },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
