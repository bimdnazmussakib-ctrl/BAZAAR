import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';
import { CartProvider } from './context/CartContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-black mb-4">404</h1>
                <p className="text-neutral-500 mb-8 font-medium">Wait, this isn't the bazaar you were looking for.</p>
                <Link to="/" className="bg-neutral-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs">Back to Market</Link>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

// Re-importing Link for the 404 block
import { Link } from 'react-router-dom';
