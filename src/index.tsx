import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes";

import { BrowserRouter } from "react-router-dom";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
       <AppRouter/>
    </BrowserRouter>
  </React.StrictMode>
);
