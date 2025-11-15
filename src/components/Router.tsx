import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PlaygroundPage from '@/components/pages/PlaygroundPage';
import GalleryPage from '@/components/pages/GalleryPage';
import SubmitPage from '@/components/pages/SubmitPage';
import DocsPage from '@/components/pages/DocsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "playground",
        element: <PlaygroundPage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "submit",
        element: <SubmitPage />,
      },
      {
        path: "docs",
        element: <DocsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
