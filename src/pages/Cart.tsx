import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  if (cartCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-neutral-100 p-8 rounded-full mb-8">
           <ShoppingBag size={48} className="text-neutral-400" />
        </div>
        <h2 className="text-3xl font-black mb-4 tracking-tight">Your cart is feeling light.</h2>
        <p className="text-neutral-500 max-w-sm mb-8">Looks like you haven't added anything to your cart yet. Explore our curated collections to find your next favorite item.</p>
        <Link
          id="cart-empty-shop"
          to="/category/all"
          className="bg-neutral-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-neutral-900">YOUR BAG</h1>
          <p className="text-neutral-500 mt-2">You have {cartCount} items in your shopping bag.</p>
        </div>
        <Link to="/category/all" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-900 flex items-center transition-colors">
          <ArrowLeft size={14} className="mr-2" /> Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
           {cart.map((item) => (
             <motion.div
               layout
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               key={item.id}
               className="flex flex-col sm:flex-row gap-6 p-6 professional-card"
             >
                <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-slate-100 shrink-0">
                   <img
                     src={item.image}
                     alt={item.name}
                     className="w-full h-full object-cover"
                     referrerPolicy="no-referrer"
                   />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 tracking-[0.2em]">{item.category}</p>
                      </div>
                      <button
                        id={`remove-cart-${item.id}`}
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50">
                         <button
                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
                           className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-lg text-slate-400"
                         > - </button>
                         <span className="w-10 text-center font-bold text-slate-800 font-mono">{item.quantity}</span>
                         <button
                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
                           className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors text-lg text-slate-400"
                         > + </button>
                      </div>
                      <span className="text-xl font-bold text-slate-900 font-mono tracking-tighter">৳{item.price * item.quantity}</span>
                   </div>
                </div>
             </motion.div>
           ))}

           {/* Free Shipping Progress */}
           <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div className="flex items-center space-x-4 mb-4">
                 <Truck className="text-blue-600" size={24} />
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Logistics Threshold</h4>
              </div>
              {cartTotal < 5000 ? (
                <p className="text-sm text-slate-600 font-medium">
                  Sync ৳{5000 - cartTotal} more to your bag to unlock <span className="font-bold text-blue-600 italic underline underline-offset-4">FREE CONCIERGE DELIVERY</span>.
                </p>
              ) : (
                <p className="text-sm text-slate-600 font-medium">
                  Architecture complete. Your order qualifies for <span className="font-bold text-emerald-600 italic tracking-wider">COMPLIMENTARY DELIVERY</span>.
                </p>
              )}
              <div className="mt-6 h-2 bg-slate-200 rounded-full overflow-hidden">
                 <motion.div
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.min(100, (cartTotal / 5000) * 100)}%` }}
                   className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                 />
              </div>
           </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
           <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 sticky top-32 shadow-2xl shadow-slate-900/40">
              <h2 className="text-xs font-bold mb-10 tracking-[0.3em] text-slate-500 uppercase border-b border-white/10 pb-4">Order Matrix / v1.0</h2>
              <div className="space-y-6 mb-10">
                 <div className="flex justify-between text-sm font-medium text-white/50 italic">
                    <span>Artifact Subtotal</span>
                    <span className="font-mono">৳{cartTotal}</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium text-white/50 italic">
                    <span>Logistics Fee</span>
                    <span className="font-mono">{cartTotal >= 5000 ? '0.00' : '৳200'}</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium text-white/50 italic">
                    <span>Tax Engine (5%)</span>
                    <span className="font-mono">৳{Math.round(cartTotal * 0.05)}</span>
                 </div>
                 <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Total Yield</span>
                    <span className="text-3xl font-bold font-mono tracking-tighter">৳{cartTotal + (cartTotal >= 5000 ? 0 : 200) + Math.round(cartTotal * 0.05)}</span>
                 </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white rounded-xl py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all flex items-center justify-center group shadow-lg shadow-blue-600/20"
              >
                EXECUTE CHECKOUT <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-10 text-center">
                 <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold italic">
                    30-Day Integrity Guarantee Included
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
