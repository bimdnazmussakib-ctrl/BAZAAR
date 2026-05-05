import { motion } from 'motion/react';
import { ArrowRight, Star, ShoppingBag, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] overflow-hidden rounded-3xl group shadow-2xl shadow-blue-900/10">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop"
          alt="Marketplace Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-white/60 text-[10px] uppercase tracking-[0.4em] font-bold mb-6 bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-lg border border-white/10"
          >
            <TrendingUp size={14} className="text-blue-400" />
            <span>Project Status: Market Active</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-[5.5rem] font-bold text-white tracking-tighter leading-[0.85] mb-8"
          >
            THE LOCAL <br /> <span className="text-blue-500">ARCHITECT.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed font-medium"
          >
            \"Focusing on local trust and faster delivery to beat generalist competitors. Quality meets professional convenience.\"
          </motion.p>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="flex flex-wrap gap-4"
          >
            <Link
              id="hero-shop-all"
              to="/category/all"
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center group/btn shadow-lg shadow-blue-600/20"
            >
              Export Roadmap <ArrowRight className="ml-3 group-hover/btn:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Badges */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Zap className="text-blue-600" />, title: "Instant Delivery", desc: "6-Hour Metro Delivery Sync" },
          { icon: <ShieldCheck className="text-blue-600" />, title: "Official Warranty", desc: "Blueprint integrity 100%" },
          { icon: <ShoppingBag className="text-blue-600" />, title: "COD Integrated", desc: "Local payment partner sync" },
          { icon: <Star className="text-blue-600" />, title: "Network Support", desc: "Expert advisor desk 24/7" },
        ].map((badge, i) => (
          <div key={i} className="professional-card p-8 flex flex-col items-center text-center">
            <div className="mb-5 bg-slate-50 p-4 rounded-xl shadow-inner">{badge.icon}</div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{badge.title}</h3>
            <p className="text-sm font-semibold text-slate-800 leading-tight">{badge.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Matrix */}
      <section>
        <div className="flex justify-between items-end mb-16 border-b border-slate-200 pb-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 tracking-widest">// SELECTED ENTITIES</h2>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[0.9]">FEATURED PICKS <span className="text-slate-300">/ v1.0</span></h3>
          </div>
          <Link to="/category/all" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2 mb-2">
            Explore All Artifacts <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -6 }}
              className="group flex flex-col professional-card overflow-hidden"
            >
              <Link id={`product-card-${product.id}`} to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                
                {product.stock < 10 && (
                   <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-[0.2em] shadow-lg">
                     Low Inventory
                   </span>
                )}
                {product.category === 'Local Crafts' && (
                   <span className="absolute bottom-4 right-4 bg-white text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-tight shadow-xl flex items-center gap-1.5 border border-slate-200">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Official Craft
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
                <Link to={`/product/${product.id}`} className="text-base font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                  {product.name}
                </Link>
                <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className="text-xl font-bold text-slate-900 font-mono tracking-tighter">৳{product.price}</span>
                  <button
                    id={`home-add-to-cart-${product.id}`}
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
      </section>

      {/* Blueprint CTA */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-20 text-white overflow-hidden relative shadow-2xl shadow-slate-900/40">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
           <div className="max-w-2xl">
              <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">// ARCHITECTURAL FOCUS</span>
              <h2 className="text-4xl sm:text-6xl font-bold leading-[0.9] mb-8 tracking-tighter">LOCAL CRAFTS <br /> <span className="text-slate-400 font-normal">REIMAGINED.</span></h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed max-w-lg font-medium italic">
                \"Every purchase from our Local Crafts collection goes directly to supporting artisans in rural communities. Focusing on local trust to beat generalist competitors.\"
              </p>
              <div className="flex gap-4">
                 <Link id="spotlight-learn-more" to="/category/local crafts" className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                    Explore Strategy
                 </Link>
                 <button className="bg-white/5 border border-white/10 px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                    View Network
                 </button>
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 -z-10" />
              <div className="grid grid-cols-2 gap-6 rotate-3">
                 <img
                   src="https://images.unsplash.com/photo-1511211020737-e05ac9e56407?q=80&w=400&auto=format&fit=crop"
                   alt="Craft 1"
                   className="w-32 h-32 sm:w-56 sm:h-56 rounded-2xl object-cover border-4 border-white/5 shadow-2xl ring-1 ring-white/10"
                   referrerPolicy="no-referrer"
                 />
                 <img
                   src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=400&auto=format&fit=crop"
                   alt="Craft 2"
                   className="w-32 h-32 sm:w-56 sm:h-56 rounded-2xl object-cover translate-y-12 border-4 border-white/5 shadow-2xl ring-1 ring-white/10"
                   referrerPolicy="no-referrer"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Market Intel / Newsletter */}
      <section className="text-center py-20 px-4 bg-white professional-card group">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <span className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Project: Bazaar Insiders</span>
          <h2 className="text-4xl font-bold mb-8 tracking-tighter text-slate-800 underline decoration-blue-500 decoration-4 underline-offset-8">JOIN THE ROADMAP.</h2>
          <p className="text-slate-500 mb-10 italic font-medium leading-relaxed max-w-lg mx-auto italic">\"Don't overbuild early. Launch fast, iterate based on real user behavior, and focus on the conversion funnel before AI personalization.\"</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              id="home-newsletter-input"
              type="email"
              placeholder="Your professional email"
              className="professional-input flex-1"
            />
            <button
               id="home-newsletter-btn"
               className="professional-btn-primary"
            >
              Sync
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
