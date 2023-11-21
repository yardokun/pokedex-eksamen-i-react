import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/home/home.page";
import Pokemon from "../pages/pokemon/pokemon.page";
import Header from "../components/header/header.component";
import { routes } from "./endpoints";

export default function Routing() {
  function BasicLayout() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BasicLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: `${routes.pokemon}`,
          element: <Pokemon />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
