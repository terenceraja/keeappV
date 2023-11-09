import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//PRIME REACT CSS IMPORTS
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css"; // core css
import "primereact/resources/themes/saga-orange/theme.css"; // theme

// REACT ROUTER IMPORTS
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//IMPORTS REDUX STORE & REDUX PERSIST
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

// IMPORTS REDUCERS
import mouvements from "../reducers/mvt.jsx";

// CONFIG REDUX STORE & REDUX PERSIST
const reducers = combineReducers({ mouvements });
const persistConfig = { key: "applicationName", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);