import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import { Root } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EndGame from './EndGame';

const router = createBrowserRouter([
  {
    path: "/game/:user",
    element: <App />,
  },
  {
    path: "/game/:user/:win",
    element: <EndGame />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

