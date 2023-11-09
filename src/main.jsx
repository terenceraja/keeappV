import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

//PRIME REACT CSS IMPORTS
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css"; // core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme

// REACT ROUTER IMPORTS
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// PAGES IMPORTS
import Layout from "./Layout";
import LoginPage from "./components/Login/LoginPage.jsx";
import ListPF from "./components/ListPF/ListPFPage.jsx";
import ListMVT from "./components/ListMVT/ListMVTPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<LoginPage />} />
      <Route path="portfolio" element={<ListPF />} />
      <Route path="mouvements" element={<ListMVT />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
