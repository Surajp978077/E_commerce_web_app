
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './Components/About';
import Root from './Components/Root';
import Card from './Card';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <About />
      },
      {
        path: '/Profile',
        element: <Card />
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
