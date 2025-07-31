import { createInertiaApp } from "@inertiajs/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import MainLayout from "./Pages/MainLayout";

createInertiaApp({
  title: (title) => (title ? `${title} - Foatier App` : "Foatier App"),
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    const page = pages[`./Pages/${name}.jsx`];
    page.default.layout =
      page.default.layout || ((page) => <MainLayout>{page}</MainLayout>);
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  },
});
