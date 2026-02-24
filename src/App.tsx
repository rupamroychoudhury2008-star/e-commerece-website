import { useState, useRef } from "react";
import { cn } from "./utils/cn";

// Types
interface ShawlProduct {
  id: number;
  name: string;
  basePrice: number;
  image: string;
  description: string;
}

interface CartItem {
  product: ShawlProduct;
  customization: Customization;
  quantity: number;
}

interface Customization {
  uploadedImage: string | null;
  selectedPattern: Pattern | null;
  borderColor: string;
  borderStyle: string;
  embroidery: string;
  size: string;
}

interface Pattern {
  id: string;
  name: string;
  preview: string;
}

// Royal Color Palette - used throughout the design
const COLORS = {
  gold: "#D4AF37",
  deepRed: "#8B0000",
  royalPurple: "#4B0082",
  maroon: "#800020",
  cream: "#FFFDD0",
  ivory: "#FFFFF0",
  emerald: "#50C878",
  navy: "#000080",
};

// Export for use in components
export { COLORS };

// Traditional Patterns
const PATTERNS: Pattern[] = [
  { id: "mughal", name: "Mughal Motifs", preview: "🌸" },
  { id: "paisley", name: "Paisley Dream", preview: "🍃" },
  { id: "floral", name: "Floral Garden", preview: "🌺" },
  { id: "geometric", name: "Geometric Art", preview: "⬡" },
  { id: "banarasi", name: "Banarasi Weave", preview: "🪷" },
  { id: "peacock", name: "Peacock Elegance", preview: "🦚" },
];

// Sample Products
const PRODUCTS: ShawlProduct[] = [
  {
    id: 1,
    name: "Royal Pashmina",
    basePrice: 15000,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400",
    description: "Luxurious Kashmiri Pashmina with hand-embroidered borders",
  },
  {
    id: 2,
    name: "Banarasi Silk Shawl",
    basePrice: 12000,
    image: "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=400",
    description: "Traditional Banarasi silk with golden zari work",
  },
  {
    id: 3,
    name: "Chikankari Shawl",
    basePrice: 8500,
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400",
    description: "Lucknowi Chikankari with delicate white embroidery",
  },
  {
    id: 4,
    name: "Kalamkari Art Shawl",
    basePrice: 9500,
    image: "https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?w=400",
    description: "Hand-painted Kalamkari with mythological motifs",
  },
  {
    id: 5,
    name: "Bandhani Tie-Dye",
    basePrice: 7500,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400",
    description: "Traditional Bandhani from Gujarat with mirror work",
  },
  {
    id: 6,
    name: "Embroidered Velvet",
    basePrice: 18000,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    description: "Royal velvet with Kundan and stone work",
  },
];

// Components
function Header({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1a0a1a] via-[#2d1a2d] to-[#1a0a1a] shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-lg">
            <span className="text-2xl">🦚</span>
          </div>
          <div>
            <h1 className="font-['Cinzel'] text-2xl font-bold text-[#D4AF37]">Rajshree</h1>
            <p className="text-xs text-amber-200/70">Royal Indian Shawls</p>
          </div>
        </div>
        
        <nav className="hidden items-center gap-8 md:flex">
          {["Collection", "Customize", "About", "Heritage"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-['Playfair_Display'] text-sm font-medium text-amber-100/80 transition-colors hover:text-[#D4AF37]"
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          onClick={onCartClick}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-all hover:bg-[#D4AF37]/20"
        >
          <svg className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B0000] text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0a1a] via-[#2d1a2d] to-[#1a0a1a] py-20">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#D4AF37] blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#800020] blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]"></span>
          <span className="font-['Playfair_Display'] text-sm text-amber-200">Handcrafted Excellence Since 1892</span>
        </div>
        
        <h2 className="font-['Cinzel'] mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
          <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
            Weave Your
          </span>
          <br />
          <span className="text-amber-100">Dream Shawl</span>
        </h2>
        
        <p className="mx-auto mb-10 max-w-2xl font-['Playfair_Display'] text-lg text-amber-100/70">
          Immerse yourself in the timeless elegance of Indian craftsmanship. 
          Customize every detail of your royal shawl with our bespoke design studio.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#8B0000] to-[#800020] px-8 py-4 font-['Cinzel'] font-semibold text-white shadow-xl shadow-[#8B0000]/30 transition-all hover:scale-105">
            <span className="relative z-10">Start Customizing</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#A00000] to-[#900020] opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
          <button className="group flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-transparent px-8 py-4 font-['Cinzel'] font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37]/10">
            <span>View Collection</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onCustomize }: { product: ShawlProduct; onCustomize: (p: ShawlProduct) => void }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-[#8B0000] to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={() => onCustomize(product)}
            className="w-full rounded-full bg-[#D4AF37] py-3 font-['Cinzel'] font-semibold text-[#1a0a1a] transition-colors hover:bg-[#E5C158]"
          >
            Customize Now
          </button>
        </div>
        
        <div className="absolute left-3 top-3 rounded-full bg-[#8B0000]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Premium
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-['Cinzel'] text-lg font-bold text-[#8B0000]">
            ₹{product.basePrice.toLocaleString()}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-sm text-[#D4AF37]">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FittingBoard({ customization }: { customization: Customization }) {
  const [drapeStyle, setDrapeStyle] = useState<"folded" | "draped" | "wrapped">("draped");
  
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#2d1a2d] to-[#1a0a1a] p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-['Cinzel'] text-lg font-semibold text-[#D4AF37]">Virtual Fitting Board</h3>
        <div className="flex gap-2">
          {(["folded", "draped", "wrapped"] as const).map((style) => (
            <button
              key={style}
              onClick={() => setDrapeStyle(style)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium capitalize transition-all",
                drapeStyle === style
                  ? "bg-[#D4AF37] text-[#1a0a1a]"
                  : "bg-white/10 text-amber-100 hover:bg-white/20"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-b from-[#3d2a3d] to-[#2d1a2d]">
        {/* Mannequin Silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-4/5 w-1/2">
            {/* Head */}
            <div className="absolute left-1/2 top-0 h-12 w-10 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#4a3a4a] to-[#3a2a3a]"></div>
            {/* Body */}
            <div className="absolute left-1/2 top-12 h-3/4 w-full -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-[#4a3a4a] to-[#3a2a3a]"></div>
            
            {/* Shawl Overlay */}
            <div
              className={cn(
                "absolute left-1/2 top-10 h-[90%] w-[180%] -translate-x-1/2 transition-all duration-500",
                customizeShawlStyle(drapeStyle, customization)
              )}
              style={{
                background: customization.uploadedImage 
                  ? `url(${customization.uploadedImage}) center/cover`
                  : customization.selectedPattern 
                    ? generatePatternBackground(customization.selectedPattern.id)
                    : `linear-gradient(135deg, #8B0000 0%, #800020 50%, #4B0082 100%)`,
                border: `3px ${customization.borderStyle} ${customization.borderColor}`,
                boxShadow: 'inset 0 0 30px rgba(212, 175, 55, 0.3)',
              }}
            >
              {/* Pattern Overlay */}
              {customization.selectedPattern && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <span className="text-6xl">{customization.selectedPattern.preview}</span>
                </div>
              )}
              
              {/* Embroidery Effect */}
              {customization.embroidery !== "none" && (
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent",
                  customization.embroidery === "heavy" ? "opacity-100" : "opacity-50"
                )}></div>
              )}
            </div>
          </div>
        </div>
        
        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/40 backdrop-blur-md p-3">
          <div className="flex items-center justify-between text-xs text-amber-100">
            <span>Size: {customization.size}</span>
            <span>Border: {customization.borderStyle}</span>
            {customization.uploadedImage && <span className="text-green-400">Custom Image ✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function customizeShawlStyle(drapeStyle: string, _customization: Customization): string {
  switch (drapeStyle) {
    case "folded":
      return "h-1/2 w-[120%] !top-20 rounded-lg";
    case "wrapped":
      return "h-3/4 w-[140%] !top-16 rounded-2xl !rounded-br-none";
    default:
      return "h-[85%] w-[160%] !top-14 rounded-2xl";
  }
}

function generatePatternBackground(patternId: string): string {
  const patterns: Record<string, string> = {
    mughal: "linear-gradient(135deg, #800020 0%, #4B0082 50%, #800020 100%)",
    paisley: "linear-gradient(45deg, #8B0000 0%, #800020 50%, #4B0082 100%)",
    floral: "linear-gradient(180deg, #800020 0%, #4B0082 100%)",
    geometric: "linear-gradient(90deg, #4B0082 0%, #800020 50%, #4B0082 100%)",
    banarasi: "linear-gradient(135deg, #D4AF37 0%, #800020 25%, #4B0082 50%, #800020 75%, #D4AF37 100%)",
    peacock: "linear-gradient(135deg, #1a5F7A 0%, #4B0082 50%, #800020 100%)",
  };
  return patterns[patternId] || patterns.floral;
}

function CustomizationPanel({ 
  customization, 
  setCustomization,
  onAddToCart 
}: { 
  customization: Customization;
  setCustomization: React.Dispatch<React.SetStateAction<Customization>>;
  onAddToCart: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"pattern" | "image" | "details">("pattern");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomization((prev) => ({ ...prev, uploadedImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const borderColors = [
    { name: "Royal Gold", value: "#D4AF37" },
    { name: "Deep Red", value: "#8B0000" },
    { name: "Royal Purple", value: "#4B0082" },
    { name: "Emerald", value: "#50C878" },
    { name: "Silver", value: "#C0C0C0" },
  ];

  const borderStyles = [
    { name: "Solid", value: "solid" },
    { name: "Double", value: "double" },
    { name: "Dashed", value: "dashed" },
    { name: "Ornate", value: "ridge" },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-2xl">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {(["pattern", "image", "details"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 font-['Cinzel'] text-sm font-medium capitalize transition-colors",
              activeTab === tab
                ? "border-b-2 border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000]"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            {tab === "image" ? "Your Image" : tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "pattern" && (
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold text-gray-900">Select Traditional Pattern</h4>
            <div className="grid grid-cols-2 gap-3">
              {PATTERNS.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => setCustomization((prev) => ({ 
                    ...prev, 
                    selectedPattern: pattern,
                    uploadedImage: null 
                  }))}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 p-4 transition-all",
                    customization.selectedPattern?.id === pattern.id
                      ? "border-[#D4AF37] bg-[#D4AF37]/10"
                      : "border-gray-200 hover:border-[#D4AF37]/50"
                  )}
                >
                  <span className="text-3xl">{pattern.preview}</span>
                  <p className="mt-2 text-xs font-medium text-gray-700">{pattern.name}</p>
                  {customization.selectedPattern?.id === pattern.id && (
                    <div className="absolute right-2 top-2 h-4 w-4 rounded-full bg-[#D4AF37]">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "image" && (
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold text-gray-900">Upload Your Design</h4>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
                customization.uploadedImage
                  ? "border-[#D4AF37] bg-[#D4AF37]/5"
                  : "border-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
              )}
            >
              {customization.uploadedImage ? (
                <div className="relative h-full w-full">
                  <img
                    src={customization.uploadedImage}
                    alt="Uploaded design"
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                    <span className="text-white">Click to change</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/10">
                    <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Click to upload your image</p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {customization.uploadedImage && (
              <button
                onClick={() => setCustomization((prev) => ({ ...prev, uploadedImage: null }))}
                className="w-full rounded-lg border border-red-300 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Remove Image
              </button>
            )}
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-6">
            {/* Border Color */}
            <div>
              <h4 className="mb-3 font-['Playfair_Display'] text-lg font-semibold text-gray-900">Border Color</h4>
              <div className="flex gap-3">
                {borderColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setCustomization((prev) => ({ ...prev, borderColor: color.value }))}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition-all hover:scale-110",
                      customization.borderColor === color.value ? "border-gray-900 scale-110" : "border-gray-200"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Border Style */}
            <div>
              <h4 className="mb-3 font-['Playfair_Display'] text-lg font-semibold text-gray-900">Border Style</h4>
              <div className="flex flex-wrap gap-2">
                {borderStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setCustomization((prev) => ({ ...prev, borderStyle: style.value }))}
                    className={cn(
                      "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all",
                      customization.borderStyle === style.value
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#1a0a1a]"
                        : "border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                    )}
                    style={{ borderStyle: style.value }}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery */}
            <div>
              <h4 className="mb-3 font-['Playfair_Display'] text-lg font-semibold text-gray-900">Embroidery Level</h4>
              <div className="flex gap-2">
                {["none", "light", "medium", "heavy"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCustomization((prev) => ({ ...prev, embroidery: level }))}
                    className={cn(
                      "flex-1 rounded-lg border-2 py-2 text-sm font-medium capitalize transition-all",
                      customization.embroidery === level
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#1a0a1a]"
                        : "border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h4 className="mb-3 font-['Playfair_Display'] text-lg font-semibold text-gray-900">Shawl Size</h4>
              <div className="flex gap-2">
                {["Small", "Medium", "Large", "Extra Large"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setCustomization((prev) => ({ ...prev, size }))}
                    className={cn(
                      "flex-1 rounded-lg border-2 py-2 text-sm font-medium capitalize transition-all",
                      customization.size === size
                        ? "border-[#D4AF37] bg-[#D4AF37] text-[#1a0a1a]"
                        : "border-gray-200 text-gray-600 hover:border-[#D4AF37]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-[#8B0000] to-[#800020] py-4 font-['Cinzel'] font-semibold text-white shadow-lg shadow-[#8B0000]/30 transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          Add to Cart - Customize & Buy
        </button>
      </div>
    </div>
  );
}

function CartModal({ 
  isOpen, 
  onClose, 
  cart, 
  onRemove
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[];
  onRemove: (index: number) => void;
}) {
  const total = cart.reduce((sum, item) => {
    let price = item.product.basePrice;
    if (item.customization.embroidery === "heavy") price += 2000;
    if (item.customization.embroidery === "medium") price += 1000;
    if (item.customization.size === "Extra Large") price += 1500;
    if (item.customization.size === "Large") price += 500;
    if (item.customization.uploadedImage) price += 500;
    return sum + price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-[#1a0a1a] to-[#2d1a2d] p-6">
          <h2 className="font-['Cinzel'] text-xl font-bold text-[#D4AF37]">Your Royal Collection</h2>
          <button onClick={onClose} className="rounded-full p-2 text-amber-100 hover:bg-white/10">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">🛒</div>
              <p className="font-['Playfair_Display'] text-lg text-gray-500">Your cart is empty</p>
              <p className="mt-2 text-sm text-gray-400">Add some royal shawls to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    {item.customization.uploadedImage ? (
                      <img src={item.customization.uploadedImage} alt="Custom" className="h-full w-full object-cover" />
                    ) : (
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Playfair_Display'] font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-xs text-gray-500">
                      {item.customization.selectedPattern?.name || "Custom Image"} • {item.customization.size}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#8B0000]">
                      ₹{(item.product.basePrice + (item.customization.embroidery === "heavy" ? 2000 : item.customization.embroidery === "medium" ? 1000 : 0) + (item.customization.uploadedImage ? 500 : 0) + (item.customization.size === "Extra Large" ? 1500 : item.customization.size === "Large" ? 500 : 0)).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(index)}
                    className="self-start rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <span className="font-['Playfair_Display'] text-lg text-gray-600">Total</span>
              <span className="font-['Cinzel'] text-2xl font-bold text-[#8B0000]">₹{total.toLocaleString()}</span>
            </div>
            <button className="mt-4 w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] py-4 font-['Cinzel'] font-semibold text-[#1a0a1a] shadow-lg transition-all hover:scale-[1.02]">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1a0a1a] via-[#2d1a2d] to-[#1a0a1a] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B]">
                <span className="text-xl">🦚</span>
              </div>
              <span className="font-['Cinzel'] text-xl font-bold text-[#D4AF37]">Rajshree</span>
            </div>
            <p className="text-sm text-amber-100/60">
              Crafting royal Indian shawls with traditional excellence since 1892.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 font-['Cinzel'] font-semibold text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-amber-100/60">
              {["Our Collection", "Customize Shawl", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#D4AF37]">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-['Cinzel'] font-semibold text-[#D4AF37]">Services</h4>
            <ul className="space-y-2 text-sm text-amber-100/60">
              {["Custom Embroidery", "Gift Wrapping", "International Shipping", "Authentication"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#D4AF37]">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 font-['Cinzel'] font-semibold text-[#D4AF37]">Newsletter</h4>
            <p className="mb-4 text-sm text-amber-100/60">Subscribe for exclusive offers and new arrivals.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-[#D4AF37]/30 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-amber-100/40 focus:border-[#D4AF37] focus:outline-none"
              />
              <button className="rounded-full bg-[#D4AF37] px-4 py-2 text-[#1a0a1a]">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-8 md:flex-row">
          <p className="text-sm text-amber-100/40">© 2024 Rajshree. All rights reserved.</p>
          <div className="flex gap-4">
            {["Instagram", "Facebook", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-amber-100/60 hover:text-[#D4AF37]"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShawlProduct | null>(null);
  const [customization, setCustomization] = useState<Customization>({
    uploadedImage: null,
    selectedPattern: PATTERNS[0],
    borderColor: "#D4AF37",
    borderStyle: "solid",
    embroidery: "medium",
    size: "Medium",
  });

  const handleCustomize = (product: ShawlProduct) => {
    setSelectedProduct(product);
    setCustomization({
      uploadedImage: null,
      selectedPattern: PATTERNS[0],
      borderColor: "#D4AF37",
      borderStyle: "solid",
      embroidery: "medium",
      size: "Medium",
    });
    document.getElementById("customization")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart((prev) => [...prev, { product: selectedProduct, customization: { ...customization }, quantity: 1 }]);
      setSelectedProduct(null);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Header cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      
      <Hero />
      
      {/* Product Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <span className="font-['Cinzel'] text-sm font-medium text-[#8B0000]">Our Collection</span>
            <h2 className="mt-2 font-['Cinzel'] text-4xl font-bold text-gray-900">
              Royal Shawl Collection
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Each piece is a testament to centuries of Indian textile heritage, 
              handcrafted by master artisans using traditional techniques.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} onCustomize={handleCustomize} />
            ))}
          </div>
        </div>
      </section>

      {/* Customization Section */}
      {selectedProduct && (
        <section id="customization" className="py-20 bg-gradient-to-b from-[#1a0a1a] via-[#2d1a2d] to-[#1a0a1a]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 text-center">
              <span className="font-['Cinzel'] text-sm font-medium text-[#D4AF37]">Design Studio</span>
              <h2 className="mt-2 font-['Cinzel'] text-4xl font-bold text-white">
                Customize Your Shawl
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-amber-100/70">
                Design a one-of-a-kind piece that reflects your personal style. 
                Upload your own image or choose from our traditional patterns.
              </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <FittingBoard customization={customization} />
              <CustomizationPanel
                customization={customization}
                setCustomization={setCustomization}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: "🎨", title: "Custom Designs", desc: "Upload your own patterns or choose from our traditional motifs" },
              { icon: "✂️", title: "Expert Craftsmanship", desc: "Each shawl is handcrafted by master artisans with generations of expertise" },
              { icon: "📦", title: "Premium Delivery", desc: "Luxury packaging with insurance and tracked shipping worldwide" },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#8B0000]/20 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}
