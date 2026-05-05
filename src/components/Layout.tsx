import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, Heart, Home, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      {/* Top Status Bar */}
      <div className="bg-slate-900 text-white/60 text-[10px] uppercase tracking-widest px-6 py-2 flex justify-between items-center shrink-0">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Official Local Marketplace</span>
          <span className="hidden sm:inline">Professional Delivery Guaranteed</span>
        </div>
        <div className="flex items-center gap-4">
          <span>৳5000 Free Shipping Threshold</span>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center sm:hidden">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <ShoppingBag size={20} strokeWidth={2.5} />
              </div>
              <Link id="nav-logo" to="/" className="text-xl font-bold tracking-tight text-slate-800">
                BAZAAR <span className="text-slate-400 font-normal">/ Local Craft</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex space-x-8 items-center font-semibold text-xs tracking-wider uppercase text-slate-500">
              {CATEGORIES.slice(0, 5).map((category) => (
                <Link
                  id={`nav-cat-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              <button
                id="search-toggle"
                onClick={() => setIsSearchOpen(true)}
                className="text-slate-500 hover:text-slate-900 p-2 transition-colors"
                title="Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>
              <Link id="nav-user" to="/profile" className="hidden sm:block text-slate-500 hover:text-slate-900 p-2 transition-colors">
                <User size={20} strokeWidth={2} />
              </Link>
              <Link
                id="nav-cart"
                to="/cart"
                className="relative bg-slate-100 text-slate-600 hover:bg-slate-200 p-2.5 rounded-lg transition-all"
              >
                <ShoppingCart size={20} strokeWidth={2} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm shadow-blue-200"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search - Visible on trigger */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 bg-white z-[60] flex items-center px-4 border-b border-blue-500 shadow-xl shadow-blue-500/5"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto flex-1 flex items-center">
                <Search className="text-blue-600 mr-4" size={22} />
                <input
                  id="nav-search-input"
                  autoFocus
                  type="text"
                  placeholder="Architect your search..."
                  className="w-full text-xl outline-none bg-transparent font-medium placeholder:text-slate-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  id="close-search"
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                >
                  <X size={24} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:px-6 lg:px-8">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <ShoppingBag size={24} strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-800">BAZAAR <span className="text-slate-400 font-normal">/ Local Craft</span></span>
             </div>
             <p className="max-w-md text-sm leading-relaxed text-slate-500 mb-8 italic">
               \"Redefining the shopping experience with a focus on trust, local craft, and speed. 
               Launch fast, iterate based on real user behavior.\"
             </p>
             <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                  <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                    {social}
                  </a>
                ))}
             </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Internal Roadmap</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Enterprise</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-600 transition-colors">Logistics Policy</Link></li>
              <li><Link to="/returns" className="hover:text-blue-600 transition-colors">Blueprint Integrity</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Network Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Market Intel</h4>
            <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-tight">Stay updated with our architectural drops.</p>
            <div className="flex flex-col gap-2">
                 <input
                   id="footer-newsletter-input"
                   type="email"
                   placeholder="Enter work email"
                   className="professional-input w-full"
                 />
                 <button
                   id="footer-newsletter-btn"
                   className="professional-btn-primary w-full"
                 >
                   Join Roadmap
                 </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center sm:px-6 lg:px-8">
             <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-400">
                <span>Session: Local Market Explorer</span>
                <span className="text-emerald-600">Build: Validated</span>
             </div>
             <div className="flex space-x-6 mt-4 sm:mt-0 text-[10px] uppercase tracking-widest font-bold text-slate-500 italic">
               <span>Secure Gateway</span>
               <span>Local Courier Sync</span>
               <span>Blueprinted in 2026</span>
             </div>
        </div>
      </footer>
    </div>
  );
}
