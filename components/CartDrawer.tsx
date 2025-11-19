
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Loader2, CheckCircle2, ArrowRight, Box } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

type CheckoutState = 'idle' | 'processing' | 'success';

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onClearCart }) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle');
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Reset state when drawer opens/closes
  useEffect(() => {
    if (!isOpen) {
        const timer = setTimeout(() => {
            setCheckoutState('idle');
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCheckout = () => {
    setCheckoutState('processing');
    
    setTimeout(() => {
        setCheckoutState('success');
        onClearCart();
    }, 2000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white/90 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {checkoutState === 'success' ? 'Confirmado' : 'O seu Carrinho'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-500" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto relative">
                
                {checkoutState === 'success' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <CheckCircle2 size={48} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Encomenda Confirmada!</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            A sua dose de felicidade está a caminho. Enviamos os detalhes para o seu email imaginário.
                        </p>
                        <button 
                            onClick={handleClose}
                            className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Continuar a comprar <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {checkoutState !== 'success' && (
                    <div className={`h-full p-6 space-y-6 no-scrollbar transition-opacity duration-300 ${checkoutState === 'processing' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <ShoppingBag size={64} strokeWidth={1} className="mb-4 opacity-50" />
                                <p className="text-lg">O carrinho está vazio.</p>
                                <p className="text-sm">Adicione alguma magia para começar.</p>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="flex gap-4 animate-fade-in border-b border-gray-100 pb-6 last:border-0">
                                    <div className="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                                        {item.isBox ? (
                                            <Box className="text-gray-400" size={32} />
                                        ) : (
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name} 
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80"; 
                                                }}
                                                className="h-full w-full object-cover" 
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                        
                                        {item.isBox && item.boxContents && (
                                            <div className="text-xs text-gray-500 mt-1 mb-2 space-y-0.5">
                                                <p className="font-medium text-gray-400 uppercase tracking-wider text-[10px]">Sabores:</p>
                                                {Array.from(new Set(item.boxContents.map(c => c.name))).map(name => {
                                                    const count = item.boxContents?.filter(c => c.name === name).length;
                                                    return (
                                                        <span key={name} className="block">
                                                            {count}x {name}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <p className="text-sm text-gray-500">{item.price.toFixed(2).replace('.', ',')} €</p>
                                    </div>
                                    <div className="flex items-center gap-3 self-start mt-2">
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            disabled={checkoutState === 'processing'}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-4 text-center font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                            disabled={checkoutState === 'processing'}
                                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {checkoutState !== 'success' && (
                <div className="p-8 border-t border-gray-200/50 bg-gray-50/50">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500">Total</span>
                        <span className="text-3xl font-bold text-gray-900">
                            {total.toFixed(2).replace('.', ',')} €
                        </span>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        disabled={items.length === 0 || checkoutState === 'processing'}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {checkoutState === 'processing' ? (
                            <>
                                <Loader2 className="animate-spin" /> Processando...
                            </>
                        ) : (
                            'Finalizar Pedido'
                        )}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4">
                        Envio calculado no próximo passo. Pagamento seguro.
                    </p>
                </div>
            )}
        </div>
      </div>
    </>
  );
};
