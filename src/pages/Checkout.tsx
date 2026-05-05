import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Truck, Wallet, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const total = cartTotal + (cartTotal >= 5000 ? 0 : 200) + Math.round(cartTotal * 0.05);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompleted(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-green-100 p-8 rounded-full mb-8"
        >
           <CheckCircle2 size={64} className="text-green-600" />
        </motion.div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">ORDER PLACED!</h1>
        <p className="text-neutral-500 max-w-md mb-8">
          Thank you for shopping at Bazaar. Your order #BZ-2026-X8 has been received.
          A confirmation email has been sent to your inbox.
        </p>
        <div className="bg-neutral-100 p-6 rounded-3xl mb-8 w-full max-w-sm text-left">
           <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Order ID</span>
              <span className="text-sm font-bold">#BZ-2026-X8</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Status</span>
              <span className="text-sm font-bold text-orange-600 italic">Processing</span>
           </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-neutral-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-colors"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
         <div>
           <h2 className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em] mb-2">// SECURE PROTOCOL</h2>
           <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 leading-[0.9]">TRANSACTION <br/> <span className="text-slate-400">ARCHITECT.</span></h1>
         </div>
         {/* Simple Progress Indicator */}
         <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-100">
            <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-blue-600' : 'bg-slate-100'}`} />
            <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-slate-100'}`} />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Form Area */}
        <div className="lg:col-span-7">
           <form onSubmit={handlePlaceOrder} className="space-y-12">
              <AnimatePresence mode="wait">
                 {step === 1 && (
                   <motion.div
                     key="step1"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="space-y-10"
                   >
                     <div className="professional-card p-10">
                        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
                           <div className="bg-blue-600 p-2.5 rounded-lg text-white">
                              <Truck size={20} strokeWidth={2.5} />
                           </div>
                           <div>
                              <h2 className="text-xl font-bold tracking-tight text-slate-800">Logistics Destination</h2>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Physical delivery point sync</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <input required placeholder="First Name" className="professional-input" />
                           <input required placeholder="Last Name" className="professional-input" />
                           <input required type="email" placeholder="Work Email" className="sm:col-span-2 professional-input" />
                           <input required placeholder="Street Address" className="sm:col-span-2 professional-input" />
                           <input required placeholder="City Hub" className="professional-input" />
                           <input required placeholder="Postal Index" className="professional-input" />
                        </div>
                     </div>
                     <button
                       type="button"
                       onClick={() => setStep(2)}
                       className="w-full professional-btn-primary py-5 text-xs tracking-[0.3em] shadow-xl shadow-slate-900/10"
                     >
                       NEXT: PAYMENT PROTOCOL
                     </button>
                   </motion.div>
                 )}

                 {step === 2 && (
                   <motion.div
                     key="step2"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="space-y-10"
                   >
                     <div className="professional-card p-10">
                        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6">
                           <div className="bg-blue-600 p-2.5 rounded-lg text-white">
                              <Wallet size={20} strokeWidth={2.5} />
                           </div>
                           <div>
                              <h2 className="text-xl font-bold tracking-tight text-slate-800">Payment Protocol</h2>
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure transaction layer</p>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div
                             onClick={() => setPaymentMethod('cod')}
                             className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                           >
                              <div className="flex items-center space-x-6">
                                 <div className={`p-3 rounded-lg ${paymentMethod === 'cod' ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                                   <Wallet size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-slate-800">Cash on Delivery</p>
                                    <p className="text-xs text-slate-400 font-medium">Verify after successful physical arrival.</p>
                                 </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'border-blue-600' : 'border-slate-300'}`}>
                                 {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                              </div>
                           </div>
                           <div
                             onClick={() => setPaymentMethod('card')}
                             className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                           >
                              <div className="flex items-center space-x-6">
                                 <div className={`p-3 rounded-lg ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                                   <ShieldCheck size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-slate-800">Credit / Debit Node</p>
                                    <p className="text-xs text-slate-400 font-medium">Instant ledger update via SSL tunnel.</p>
                                 </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'border-blue-600' : 'border-slate-300'}`}>
                                 {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="sm:w-1/3 professional-btn-secondary py-5 uppercase tracking-[0.2em] text-[10px]"
                        >
                           SYNC BACK
                        </button>
                        <button
                          type="submit"
                          className="flex-1 professional-btn-primary bg-blue-600 hover:bg-blue-700 py-5 uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20"
                        >
                          EXECUTE TRANSACTION
                        </button>
                     </div>
                   </motion.div>
                 )}
              </AnimatePresence>
           </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
           <div className="bg-slate-900 text-white rounded-2xl p-10 sticky top-32 shadow-2xl shadow-slate-900/40">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-slate-500 border-b border-white/10 pb-6">Yield Summary / v1.0</h3>
              <div className="space-y-6 mb-10">
                 <div className="flex justify-between text-sm font-medium text-white/50 italic leading-relaxed">
                    <span>Artifact Points</span>
                    <span className="font-mono">৳{cartTotal}</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium text-white/50 italic leading-relaxed">
                    <span>Logistics Node</span>
                    <span className="font-mono">{cartTotal >= 5000 ? '0.00' : '৳200'}</span>
                 </div>
                 <div className="flex justify-between text-sm font-medium text-white/50 italic leading-relaxed">
                    <span>Tax Engine (5%)</span>
                    <span className="font-mono">৳{Math.round(cartTotal * 0.05)}</span>
                 </div>
                 <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-1">Final Total</span>
                    <span className="text-4xl font-bold font-mono tracking-tighter">৳{total}</span>
                 </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/5">
                 <div className="flex items-center text-[10px] text-white/40 uppercase tracking-[0.2em] gap-3 font-bold">
                    <Truck size={14} className="text-blue-500" />
                    <span>ETA: 2-5 CYCLES</span>
                 </div>
                 <div className="flex items-center text-[10px] text-white/40 uppercase tracking-[0.2em] gap-3 font-bold">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>ENCRYPTED PROTOCOL</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
