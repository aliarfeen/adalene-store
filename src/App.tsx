import { Layout } from 'lucide-react';
import { Footer } from './Components/layout/Footer';
import { Navbar } from './Components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import Cart from './Pages/Cart/cartPage';


const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default App;