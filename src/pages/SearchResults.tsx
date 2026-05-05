import { useSearchParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Search as SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useMemo } from 'react';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const results = useMemo(() => {
    if (!query) return [];
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="pt-8">
         <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase">
            Search Results for: <span className="text-orange-600 italic">"{query}"</span>
         </h1>
         <p className="text-neutral-500 mt-2">
            We found {results.length} item{results.length !== 1 ? 's' : ''} matching your request.
         </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
          {results.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-100 mb-4">
                <Link id={`search-product-${product.id}`} to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-white text-neutral-900 p-4 rounded-2xl shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:bg-orange-600 hover:text-white"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full uppercase tracking-tighter inline-block">{product.category}</span>
                <Link to={`/product/${product.id}`} className="block text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {product.name}
                </Link>
                <p className="text-lg font-black text-neutral-900 italic">৳{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
           <div className="bg-neutral-100 p-6 rounded-full mb-6">
              <SearchIcon size={32} className="text-neutral-400" />
           </div>
           <h2 className="text-2xl font-bold mb-2">No matching items found.</h2>
           <p className="text-neutral-500 mb-8">Try adjusting your terms or browse our popular categories.</p>
           <div className="flex gap-4">
              <Link to="/category/all" className="bg-neutral-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs">Browse All</Link>
              <Link to="/" className="border border-neutral-200 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-neutral-50">Back Home</Link>
           </div>
        </div>
      )}
    </div>
  );
}
