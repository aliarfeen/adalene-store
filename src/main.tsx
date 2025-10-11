import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import 'flowbite';

import { HomePage } from './Pages/Home/HomePage.tsx';
import { About } from './Pages/About/About.tsx';
import { Contact } from './Pages/Contact/Contact.tsx';
import { Products } from './Pages/Products/Products.tsx';
import { Bag } from './Pages/Catagories/Bag.tsx';
import { Belts } from './Pages/Catagories/Belts.tsx';
import { ProfilePage } from './Pages/Profile/ProfilePage.tsx';
import { MiniBag } from './Pages/Catagories/MiniBag.tsx';
import { Detail } from './Pages/Details/Detail.tsx';
import { NotFound } from './Pages/NotFound/NotFound.tsx';
import { LogOut } from './Pages/Auth/LogOut.tsx';
import { LogIn } from './Pages/Auth/LogIn.tsx';
import { SignIn } from './Pages/Auth/SignIn.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> }, 
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product", element: <Products /> },
      { path: "bag", element: <Bag /> },
      { path: "belts", element: <Belts /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "minibag", element: <MiniBag /> },
      { path: "details/:id", element: <Detail /> },
      { path: "*", element: <NotFound /> },
    ]
  },
  { path: "logout", element: <LogOut /> },
  { path: "login", element: <LogIn /> },
  { path: "signIn", element: <SignIn /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
