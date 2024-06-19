import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./common_components/Navbar";
import Footer from "./common_components/Footer";
import BlogPage from "./pages/Single";
import Write from "./pages/Write";
import UserDashboard from "./pages/UserDashboard";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>

  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blog/:id",
        element: <BlogPage />
      },
      {
        path: "/dashboard",
        children: [
          {
            path: ":username",
            children: [
              {
                path: "",
                element: <UserDashboard />
              },
              {
                path: "myblogs",
                element: <UserDashboard />
              },
              {
                path: "create-blog",
                element: <Write />
              },
            ]
          },
        ]
      },
      
      {
        path: "/register",
        element: <Login pageType={"register"} />
      },
      {
        path: "/login",
        element: <Login pageType={"login"} />
      },
    ]
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
library.add(fab, fas, far)
