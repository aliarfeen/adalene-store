import { Outlet } from "react-router-dom"
import { Footer } from "./Components/layout/Footer"
import { Navbar } from "./Components/layout/Navbar"
import ChatBot from "./Components/Chat/Chat"





export const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ChatBot />
    </div>
  )
}
