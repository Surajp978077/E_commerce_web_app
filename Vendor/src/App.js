
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Root from './Components/Root';
import Card from './Card';
import UserInfoProvider from './UserInfoProvider';

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
        path: '/Profile',
        element: <Card />
      },
    ]
  }
])

function App() {
  return (<UserInfoProvider>
    <RouterProvider router={router} />
  </UserInfoProvider>
  );
}

export default App;
