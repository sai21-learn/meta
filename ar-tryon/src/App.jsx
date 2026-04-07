import React, { useState, useRef } from 'react';
import ARScene from './components/AR/ARScene';
import Gallery from './components/UI/Gallery';
import { useHandTracking } from './hooks/useHandTracking';
import productsData from './data/products.json';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(productsData[0]);
  const videoRef = useRef(null);
  const { landmarks, isReady } = useHandTracking(videoRef);

  return (
    <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
      {/* Hidden Video for tracking */}
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        muted
      />

      {/* AR Background Scene */}
      <ARScene product={selectedProduct} landmarks={landmarks} />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none ar-overlay flex flex-col justify-between p-6">
        {/* Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tighter">LUXE<span className="text-premium-gold">AR</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 font-medium">Experimental Try-On</p>
          </div>
          <div className="flex space-x-3">
            <button className="p-3 glass rounded-full hover:bg-white/10 transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            </button>
            <button className="p-3 glass rounded-full hover:bg-white/10 transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
            </button>
          </div>
        </header>

        {/* Status Indicator */}
        <div className="self-center mb-auto pt-24 text-center">
          {!isReady && (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-premium-gold border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-light tracking-widest opacity-70">INITIALIZING OPTICS</p>
            </div>
          )}
          {isReady && !landmarks && (
            <div className="px-8 py-3 glass rounded-full text-xs font-medium tracking-wide animate-pulse uppercase">
              Position your hand in view
            </div>
          )}
        </div>

        {/* Capture Button */}
        <div className="self-center pointer-events-auto mb-8">
          <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 group hover:scale-110 active:scale-95 transition-all duration-300">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
            </div>
          </button>
        </div>

        {/* Product Gallery */}
        <div className="pointer-events-auto">
          <Gallery
            products={productsData}
            onSelect={setSelectedProduct}
            activeId={selectedProduct?.id}
          />
        </div>
      </div>

      {/* Product Details Hint */}
      {selectedProduct && isReady && (
        <div className="absolute top-24 left-6 pointer-events-none animate-in fade-in slide-in-from-left duration-500">
          <div className="glass px-4 py-2 rounded-lg">
            <h2 className="text-xs font-bold uppercase tracking-widest text-premium-gold">{selectedProduct.type}</h2>
            <p className="text-lg font-bold">{selectedProduct.name}</p>
            <p className="text-sm opacity-60 font-medium">{selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
