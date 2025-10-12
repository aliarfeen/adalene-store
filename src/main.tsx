import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./App/store.ts";
import { Provider } from "react-redux";
import 'flowbite';


import {App }from "./App.tsx";
import { HomePage } from "./Pages/Home/HomePage.tsx";
import { NotFound } from "./Pages/NotFound/NotFound.tsx";
import ProductListPage from "./Pages/Products/ProductList.tsx";
import Cart from "./Pages/Cart/cartPage.tsx";
import OurStory from './Pages/Story&craft/OurStory.tsx'
import { OurCraft } from "./Pages/Story&craft/OurCraft.tsx";
import ProductDetails from "./Pages/Products/ProductDetails.tsx";
import ProductDetailsLayout from "./Components/ProductDetails/ProductLayOut.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";




const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, 
      {path:"/products", element: <ProductListPage /> }, 
       {path:"/cart", element: <Cart /> }, 
       {path:"/story",element:<OurStory/>},
       {path:"/craft",element:<OurCraft/>},
       {
        path: "product/:slug",
        element: <ProductDetailsLayout />,
        children: [{ index: true, element: <ProductDetails /> }],
      },
      { path: "*", element: <NotFound /> },
    ]
  }
]);

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <Provider store={store}>
      <ProductProvider>
    <QueryClientProvider client={queryClient}>
     <RouterProvider router={router} />
    </QueryClientProvider>
    </ProductProvider>
    </Provider>
  </StrictMode>
  
);



