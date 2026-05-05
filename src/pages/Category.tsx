import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState, useMemo } from 'react';

export default function Category() {
  const { name } = useParams();
  const { addToCart } = useCart();
  const [activeSort, setActiveSort] = useState('Newest');

  const filteredProducts = useMemo(() => {
    if (!name || name.toLowerCase() === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category.toLowerCase() === name.toLowerCase());
  }, [name]);

  const sortedProducts = useMemo(() => {
    switch (activeSort) {
      case 'Price: Low to High':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'Rating':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, activeSort]);

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-12 gap-8">
        <div>
           <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em] mb-4">// CLASSIFICATION</h2>
           <h1 className="text-5xl sm:text-[5rem] font-bold tracking-tighter text-slate-900 leading-[0.85] uppercase">
              {name ? name : 'ALL ENTITIES'}
           </h1>
           <p className="text-slate-400 mt-6 max-w-md italic font-medium">
              \"Discover our collection of {name ? name.toLowerCase() : 'all categories'}, architected for quality and professional merit.\"
           </p>
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <div className="bg-white professional-card p-2 flex items-center gap-4 w-full sm:w-auto">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">Matrix Sort:</label>
              <div className="relative group flex-1 sm:flex-none">
                 <button className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-slate-900 bg-slate-50 px-6 py-2.5 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors w-full sm:w-60 justify-between">
                    <span>{activeSort}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                 </button>
                 <div className="absolute right-0 top-full mt-2 w-full sm:w-60 bg-white border border-slate-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30 overflow-hidden divide-y divide-slate-50">
                    {['Newest', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(option => (
                      <button
                        key={option}
                        onClick={() => setActiveSort(option)}
                        className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex justify-start flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
         {CATEGORIES.map(cat => (
           <Link
             id={`pill-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
             key={cat}
             to={`/category/${cat.toLowerCase()}`}
             className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${(!name && cat === 'All') || (name?.toLowerCase() === cat.toLowerCase()) ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300 hover:text-slate-900'}`}
           >
             {cat}
           </Link>
         ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <motion.div
            layout
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            className="group flex flex-col professional-card overflow-hidden"
          >
            <Link id={`cat-product-${product.id}`} to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                
                {product.stock < 10 && (
                   <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-[0.2em]">
                     Low Inventory
                   </span>
                )}
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">{product.category}</span>
                   <div className="flex items-center text-[10px] font-bold text-slate-800">
                     <Star size={12} className="fill-blue-500 text-blue-500 mr-1" /> {product.rating}
                   </div>
                </div>
                <Link to={`/product/${product.id}`} className="text-base font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight min-h-[3rem]">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xl font-bold text-slate-900 font-mono tracking-tighter">৳{product.price}</span>
                  <button
                    id={`cat-add-to-cart-${product.id}`}
                    onClick={() => addToCart(product)}
                    className="bg-slate-100 text-slate-900 p-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingBag size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
