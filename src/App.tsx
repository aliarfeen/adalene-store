import { Outlet } from "react-router-dom"
import { Footer } from "./Components/layout/Footer"
import { Navbar } from "./Components/layout/Navbar"
import ScrollToTop from "./Components/Common/ScrollToTop"






export const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />

    </div>
  )
}
