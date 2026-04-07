import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Gallery = ({ products, onSelect, activeId }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current.children,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
            );
        }
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 p-6 ar-overlay" ref={containerRef}>
            <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                {products.map((product) => (
                    <button
                        key={product.id}
                        onClick={() => onSelect(product)}
                        className={`flex-shrink-0 w-32 h-40 glass rounded-2xl p-4 flex flex-col items-center justify-between transition-all duration-300 ${activeId === product.id ? 'border-premium-gold ring-2 ring-premium-gold' : 'border-white/10'
                            }`}
                    >
                        <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mb-2 shadow-lg shadow-premium-gold/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-semibold text-white truncate w-24">{product.name}</p>
                            <p className="text-[10px] text-premium-gold">{product.price}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
