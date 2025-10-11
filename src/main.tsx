import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'flowbite';
import { HomePage } from "./Pages/Home/HomePage.tsx";
import { NotFound } from "./Pages/NotFound/NotFound.tsx";
import ProductListPage from "./Pages/Products/ProductList.tsx";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";
import Cart from "./Pages/Cart/cartPage.tsx";
// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, 
      {path:"/products", element: <ProductListPage /> }, 
       {path:"/cart", element: <Cart /> }, 
  
      { path: "*", element: <NotFound /> },
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
 <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </StrictMode>
  
);



