import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";

import 'flowbite';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Pages & Layouts
import { App } from "./App.tsx";
import { HomePage } from "./Pages/Home/HomePage.tsx";
import ProductListPage from "./Pages/Products/ProductList.tsx";
import ProductDetails from "./Pages/Products/ProductDetails.tsx";
import ProductDetailsLayout from "./Components/ProductDetails/ProductLayOut.tsx";
import Cart from "./Pages/Cart/cartPage.tsx";
import CheckoutPage from "./Pages/Checkout/Checkout.tsx";
import OrderSuccess from "./Pages/Checkout/OrderSuccess.tsx";
import OurStory from './Pages/Story&craft/OurStory.tsx';
import OurCraft from "./Pages/Story&craft/OurCraft.tsx";
import Login from "./Pages/Auth/SignIn.tsx";
import SignUp from "./Pages/Auth/SignUp.tsx";
import ForgotPassword from "./Pages/Auth/ForgetPassword.tsx";
import ResetPassword from "./Pages/Auth/ResetPassword.tsx";
import AuthLayout from "./Components/layout/AuthLayout.tsx";
import UserProfileLayout from "./Components/layout/UserProfileLayout.tsx";
import MyOrders from "./Pages/Profile/MyOrders.tsx";
import AccountDetails from "./Pages/Profile/ProfilePage.tsx";
import { NotFound } from "./Pages/NotFound/NotFound.tsx";

import { ProductProvider } from "./context/ProductContext.tsx";
import OrderReview from "./Pages/Order/OrderPage.tsx";
import OrderDetails from "./Pages/Order/OrderDetails.tsx";
import AdminLayout from "./Components/layout/AdminDashboardLayout.tsx";
import DashBoard from "./Pages/Admin/Dashboard.tsx";
import UsersTable from "./Pages/Admin/UsersDash.tsx";
import OrdersTable from "./Pages/Admin/OrdersDash.tsx";
import ProductsTable from "./Pages/Admin/ProductsDash.tsx";
import ProtectedRoute from "./Routes/ProtectedRoute.tsx";
import ContactUs from "./Pages/ContactUs/ContactUs.tsx";
import ContactRequests from "./Pages/Admin/ContactRequests.tsx";

// Create Query Client
const queryClient = new QueryClient();

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductListPage 
        category=""
        /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "ordersuccess", element: <OrderSuccess /> },
      { path: "orderreview", element: <OrderReview /> },
      { path: "story", element: <OurStory /> },
      { path: "craft", element: <OurCraft /> },
      {path:"contact",element:<ContactUs/>},
      {
        path: "product/:slug",
        element: <ProductDetailsLayout />,
        children: [{ index: true, element: <ProductDetails /> }],
      },
    ],
  },


  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgetpassword", element: <ForgotPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
    ],
  },


  {
  path: "/profile",
  element: <ProtectedRoute allowedRole="customer" />,  // حماية للـ customers
  children: [
    { element: <UserProfileLayout />, children: [
      { index: true, element: <Navigate to="account" replace /> },
      { path: "account", element: <AccountDetails /> },
      { path: "myorder", element: <MyOrders /> },
      { path: "myorder/:id", element: <OrderDetails /> },
    ] }
  ]
},

  
  // Admin Dashboard routes
{
  path: "/admin",
  element: <ProtectedRoute allowedRole="admin" />,  
  children: [
    { element: <AdminLayout />, children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "userstable", element: <UsersTable /> },
      { path: "orderstable", element: <OrdersTable /> },
      { path: "productstable", element: <ProductsTable /> },
      { path: "contactrequests", element: <ContactRequests /> },//<=

    ]}
  ]
},

  // Global catch-all for 404
  { path: "*", element: <NotFound /> },


]);

// Render
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
