import { AnimeDetails } from "@/pages/anime-details";
import { HomePage } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { Schedule } from "@/pages/schedule";
import { Layout } from "@/widgets/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home-page" replace />,
      },
      {
        path: "home-page",
        element: <HomePage />,
      },
      {
        path: "anime-details/:id",
        element: <AnimeDetails />,
      },
      {
        path: "schedule-page",
        element: <Schedule />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

export const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
