import { Outlet } from "react-router-dom"
import { Footer } from "./Components/layout/Footer"
import { Navbar } from "./Components/layout/Navbar"





export const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />

    </div>
  )
}
