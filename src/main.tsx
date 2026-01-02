import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ModelsAbout from './pages/ModelsAbout.tsx';
import DatasetsAbout from './pages/DatasetsAbout.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/models-about",
        element: <ModelsAbout />,
      },
      {
        path: "/datasets-about",
        element: <DatasetsAbout />,
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
