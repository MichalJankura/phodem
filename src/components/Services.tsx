// src/components/RestaurantSections.tsx

import React from "react";
// Removed useScrollAnimation for always-visible rendering

const cards = [
  {
    title: "Reštaurácia",
    image: "/menu-optimized.jpg",
    srcSet: "/menu-optimized.jpg 800w, /menu-optimized.jpg 1200w",
    sizes: "(min-width:1024px) 33vw, 100vw",
    desc: "Už viac ako 10 rokov Vám prinášame pravé vietnamské a ázijské špeciality pripravené z čerstvých surovín, tradičných rezancov, polievok a wok jedál.",
    bg: "bg-[#FF8622]",
    text: "text-neutral-900",
  },
  {
    title: "Oslavy",
    image: "/restaurant-optimized.webp",
    srcSet: "/restaurant-optimized.webp 800w, /restaurant-optimized.webp 1200w",
    sizes: "(min-width:1024px) 33vw, 100vw",
    desc: "Plánujete rodinnú oslavu, svadbu, firemný večierok alebo narodeniny? Naša reštaurácia a salónik je ideálnym miestom na vaše ázijské oslavy s originálnou kuchyňou.",
    bg: "bg-neutral-800",
    text: "text-white",
  },
  {
    title: "Denné menu",
    image: "/denne-optimized.jpg",
    srcSet: "/denne-optimized.jpg 800w, /denne-optimized.jpg 1200w",
    sizes: "(min-width:1024px) 33vw, 100vw",
    desc: "Každý pracovný deň ponúkame pestré ázijské denné menu a rýchly rozvoz teplých jedál priamo do vašej firmy alebo domov.",
    bg: "bg-[#FF8622]",
    text: "text-neutral-900",
  },
];

const Services: React.FC = () => {
  return (
    <div 
      className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans" 
      id="services"
    >
      {cards.map((card) => (
        <div key={card.title} className="flex-1 flex flex-col min-h-[50vh] lg:min-h-full">
          <div className={`${card.bg} ${card.text} flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-[25vh] lg:min-h-0`}>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-center drop-shadow">{card.title}</h2>
            <p className="text-sm md:text-base lg:text-lg font-medium text-center max-w-sm lg:max-w-none">{card.desc}</p>
          </div>
          <div className="flex-1 w-full overflow-hidden min-h-[25vh] lg:min-h-0">
            <img
              src={card.image}
              srcSet={card.srcSet}
              sizes={card.sizes}
              alt={card.title}
              className="w-full h-full object-center object-cover lg:object-scale-down"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
