import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "admin",
        element: <div>Admin</div>,
      },
      {
        path: "requester",
        element: <div>Requester</div>,
      },
    ],
  },
]);

export default router;
