import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import AddContact from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="add" element={<AddContact />} />
      <Route path="edit/:id" element={<AddContact />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);