import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/home/home.page";
import AllPokemon from "../pages/allPokemon/allPokemon.page.jsx";
import AddPokemon from "../pages/addPokemon/addPokemon.page.jsx";
import MyFavorites from "../pages/myFavorites/myFavorites.page.jsx";
import Logo from "../components/logo/logo.component.jsx";
import { routes } from "./endpoints";

export default function Routing() {
  function BasicLayout() {
    return (
      <>
        <Logo />
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
          path: `${routes.allPokemon}`,
          element: <AllPokemon />,
        },
        {
          path: `${routes.addPokemon}`,
          element: <AddPokemon />,
        },
        {
          path: `${routes.myFavorites}`,
          element: <MyFavorites />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
