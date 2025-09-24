import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup.jsx';
import Checkout from './Pages/Checkout.jsx';

// Banner images import
import men_banner from './Component/Asset/banner_mens.png';
import women_banner from './Component/Asset/banner_women.png';
import kids_banner from './Component/Asset/banner_kids.png';

// --- FIXES ARE HERE ---
// These paths assume your files are directly inside the 'src/Pages' folder
import Admin from './Pages/Admin.jsx';
import SearchResults from './Pages/SearchResults.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/search' element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;