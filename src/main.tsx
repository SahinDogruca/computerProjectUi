import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.tsx'
import DatasetsAbout from './pages/DatasetsAbout.tsx';
import ModelsAbout from './pages/ModelsAbout.tsx';
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
    <RouterProvider router={router}/>
  </StrictMode>
)
