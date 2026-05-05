import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Product not found.</h2>
      <Link to="/" className="text-orange-600 font-bold underline">Go back home</Link>
    </div>
  );

  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400">
        <Link to="/" className="hover:text-neutral-900">Home</Link>
        <ChevronRight size={14} />
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-neutral-900">{product.category}</Link>
        <ChevronRight size={14} />
        <span className="text-neutral-900 truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Product Images */}
        <div className="lg:col-span-7 space-y-4">
           <div className="aspect-[4/5] bg-neutral-100 rounded-[2rem] overflow-hidden group relative">
             <motion.img
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               src={product.image}
               alt={product.name}
               className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
               referrerPolicy="no-referrer"
             />
             <button
               id="product-zoom-btn"
               className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
             >
                <Share2 size={20} />
             </button>
           </div>
           <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 ring-orange-500 transition-all opacity-60 hover:opacity-100">
                  <img
                    src={product.image}
                    alt={`${product.name} shadow`}
                    className="w-full h-full object-cover grayscale-[20%]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
           </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border border-blue-100">
                ENTITY: {product.category}
              </span>
              <div className="flex items-center text-xs font-bold text-slate-400">
                <Star size={14} className="fill-blue-500 text-blue-500 mr-1.5" />
                <span className="text-slate-900">{product.rating}</span>
                <span className="mx-2 text-slate-200">|</span>
                <span>{product.reviews} Reviews</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 mb-6 leading-[0.9]">{product.name}</h1>
            <div className="flex items-baseline space-x-4 mb-8">
               <span className="text-4xl font-bold text-slate-900 font-mono tracking-tighter">৳{product.price}</span>
               {product.stock < 10 && (
                 <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                   Inventory Alert: {product.stock} Units
                 </span>
               )}
            </div>
            <p className="text-slate-500 leading-relaxed text-base mb-10 font-medium italic">
              {product.description}
            </p>

            <div className="space-y-8">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-6">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Quantity Selector</span>
                 <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-white shadow-inner">
                   <button
                     onClick={() => setQuantity(q => Math.max(1, q - 1))}
                     className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-colors font-bold text-slate-400"
                   > - </button>
                   <span className="w-12 text-center font-bold text-slate-900 text-lg font-mono">{quantity}</span>
                   <button
                     onClick={() => setQuantity(q => q + 1)}
                     className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-lg transition-colors font-bold text-slate-400"
                   > + </button>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                 <button
                   id={`add-to-cart-${product.id}`}
                   onClick={() => addToCart(product)}
                   className="flex-1 professional-btn-primary py-5 text-xs tracking-[0.25em] shadow-lg shadow-slate-900/10"
                 >
                   <ShoppingBag size={18} className="mr-3" strokeWidth={2.5} /> SYNC TO BAG
                 </button>
                 <button
                   onClick={() => setIsLiked(!isLiked)}
                   className={`p-5 rounded-xl border transition-all ${isLiked ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                 >
                    <Heart size={20} className={isLiked ? "fill-current" : ""} />
                 </button>
              </div>
            </div>
          </div>

          {/* Delivery & Returns Basic */}
          <div className="grid grid-cols-1 border-y border-slate-100 py-10 space-y-8">
             <div className="flex items-start">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mr-4 shadow-sm">
                   <Truck className="text-blue-600" size={20} strokeWidth={2} />
                </div>
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Logistics Sync</p>
                   <p className="text-sm font-semibold text-slate-700">6-Hour Metro Delivery Available</p>
                </div>
             </div>
             <div className="flex items-start">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mr-4 shadow-sm">
                   <RotateCcw className="text-blue-600" size={20} strokeWidth={2} />
                </div>
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quality Assurance</p>
                   <p className="text-sm font-semibold text-slate-700">Blueprint Integrity Guarantee - 30 Days</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="pt-16">
        <div className="flex border-b border-slate-100 mb-10 overflow-x-auto gap-1">
           {['description', 'specifications', 'reviews'].map(tab => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all whitespace-nowrap border-b-2 ${activeTab === tab ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-400 border-transparent hover:text-slate-900'}`}
             >
               {tab}
             </button>
           ))}
        </div>

        <AnimatePresence mode="wait">
           <motion.div
             key={activeTab}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.2 }}
             className="text-neutral-600 leading-relaxed text-sm lg:text-base max-w-4xl"
           >
              {activeTab === 'description' && (
                <div className="space-y-6">
                   <p>{product.description}</p>
                   <p>Crafted to define your space with authenticity and modern flair. Our commitment to quality ensures that this product isn't just an item, but a long-term investment into your lifestyle. Sourced responsibly and delivered with care.</p>
                </div>
              )}
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
                   {[
                     { label: 'Category', value: product.category },
                     { label: 'Weight', value: '450g' },
                     { label: 'Material', value: 'Premium Grade' },
                     { label: 'Warranty', value: '1 Year Manufacturer' },
                     { label: 'Dimensions', value: 'Standard Size' },
                     { label: 'Model', value: `BZ-${id}-2026` },
                   ].map((spec, i) => (
                     <div key={i} className="flex bg-white p-4">
                        <span className="w-1/3 text-xs font-bold text-neutral-400 uppercase tracking-widest">{spec.label}</span>
                        <span className="w-2/3 text-sm font-medium text-neutral-900">{spec.value}</span>
                     </div>
                   ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                         <span className="text-5xl font-black text-neutral-900">{product.rating}</span>
                         <div className="flex flex-col">
                            <div className="flex items-center">
                               {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className={i <= Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-neutral-200"} />)}
                            </div>
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">Based on {product.reviews} reviews</span>
                         </div>
                      </div>
                      <button className="bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">Write Review</button>
                   </div>
                   <div className="space-y-6">
                      {[1, 2].map(i => (
                        <div key={i} className="bg-neutral-50 p-6 rounded-3xl border border-neutral-100">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center space-x-3">
                                 <div className="w-10 h-10 rounded-full bg-neutral-200" />
                                 <div>
                                    <p className="text-sm font-bold text-neutral-900">Premium User</p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Verified Purchase</p>
                                 </div>
                              </div>
                              <div className="flex text-orange-500">
                                 {[1, 2, 3, 4, 5].map(star => <Star key={star} size={12} className="fill-current" />)}
                              </div>
                           </div>
                           <p className="text-sm italic">"Absolutely love the quality. Exceeded my expectations for a local marketplace. The delivery was incredibly fast!"</p>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </motion.div>
        </AnimatePresence>
      </section>

      {/* Recommended Products */}
      <section className="pt-12 border-t border-neutral-100">
         <h2 className="text-2xl font-black mb-8 tracking-tight">YOU MAY ALSO LIKE</h2>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {PRODUCTS.filter(p => p.id !== id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group space-y-4">
                 <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors">{p.name}</h3>
                    <p className="text-sm font-black mt-1">৳{p.price}</p>
                 </div>
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
}
