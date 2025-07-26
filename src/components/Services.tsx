// src/components/RestaurantSections.tsx

import React from "react";
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const cards = [
    {
        title: "Reštaurácia",
        image: "/menu.jpg", // nahraď svojím obrázkom
        desc: "Už viac ako 10 rokov Vám prinášame pravé vietnamské a ázijské špeciality pripravené z čerstvých surovín, tradičných rezancov, polievok a wok jedál.",
        bg: "bg-yellow-200",
        text: "text-neutral-900",
    },
    {
        title: "Oslavy",
        image: "/restaurant.png",
        desc: "Plánujete rodinnú oslavu, svadbu, firemný večierok alebo narodeniny? Naša reštaurácia a salónik je ideálnym miestom na vaše ázijské oslavy s originálnou kuchyňou.",
        bg: "bg-neutral-800",
        text: "text-white",
    },
    {
        title: "Denné menu",
        image: "/denne.jpg",
        desc: "Každý pracovný deň ponúkame pestré ázijské denné menu a rýchly rozvoz teplých jedál priamo do vašej firmy alebo domov.",
        bg: "bg-yellow-100",
        text: "text-neutral-900",
    },
];

const Services: React.FC = () => {
  const { elementRef: sectionRef } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    animationClass: 'animate-fade-in-scale'
  });

  return (
    <div 
      className="w-full min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans scroll-fade-in" 
      id="services"
      ref={sectionRef}
    >
      {cards.map((card) => {
        const { elementRef: cardRef } = useScrollAnimation<HTMLDivElement>({
          // threshold: 0.2,
          // animationClass: 'animate-fade-in-scale',
        });

        return (
          <div key={card.title}
            className="flex-1 flex flex-col min-h-[50vh] lg:min-h-full"
            ref={cardRef}
          >
            <div className={`${card.bg} ${card.text} flex-1 flex flex-col items-center justify-center px-6 py-8 min-h-[25vh] lg:min-h-0`}>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-center drop-shadow">{card.title}</h2>
              <p className="text-sm md:text-base lg:text-lg font-medium text-center max-w-sm lg:max-w-none">{card.desc}</p>
            </div>
            <div className="flex-1 w-full overflow-hidden min-h-[25vh] lg:min-h-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-center object-cover lg:object-scale-down"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
