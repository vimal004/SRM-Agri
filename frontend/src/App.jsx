import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Pages/Home";
import AdminHome from "./Pages/Admin/AdminHome";
import RequestHome from "./Pages/Requester/RequestHome";
import RequestResources from "./Pages/Requester/RequestResources";
import ApproveResources from "./Pages/Admin/ApproveResources";

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
        element: <AdminHome />,
      },
      {
        path: "requester",
        element: <RequestHome />,
      },
      {
        path: "approveresources",
        element: <ApproveResources />,
      },
      {
        path: "requestresources", 
        element: <RequestResources />,
      },
    ],
  },
]);

export default router;
