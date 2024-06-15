import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./common_components/Navbar";
import Footer from "./common_components/Footer";
import BlogPage from "./pages/Single";
import Write from "./pages/Write";

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
        path: "/create-blog",
        element: <Write />
      },
    ]
  },
  {
    path: "/register",
    element: <Login pageType = {"register"}/>
  },
  {
    path: "/login",
    element: <Login pageType = {"login"}/>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
