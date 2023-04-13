
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
        element: <Card />
      },
      {
        path: '/about',
        element: <About />
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
