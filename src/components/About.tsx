import igvideo from '../assets/igvideo.mp4';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
    const { elementRef: sectionRef } = useScrollAnimation({
        threshold: 0.1,
        animationClass: 'animate-fade-in-up'
    });

    return (
        <section 
            id="about" 
            className="bg-neutral-800 font-sans scroll-fade-in"
            ref={sectionRef}
        >
            <div className="flex flex-col md:flex-row w-full">
                {/* Left side - Video */}
                <div 
                    className="w-full md:w-1/2 md:pl-0"
                >
                <div className="overflow-hidden shadow-lg">
                    <div className="relative w-full h-screen" style={{ aspectRatio: '9/16' }}>
                    <video 
                        className="absolute inset-0 w-full h-full object-cover"
                        src={igvideo}
                        title="O našej reštaurácii"
                        muted
                        loop
                        playsInline
                        ref={(el) => {
                        if (el) {
                            const observer = new IntersectionObserver(
                            (entries) => {
                                entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    el.play();
                                } else {
                                    el.pause();
                                }
                                });
                            },
                            { threshold: 0.3 }
                            );
                            observer.observe(el);
                        }
                        }}
                    />
                    </div>
                </div>
                </div>
                
                {/* Right side - Text */}
                <div 
                    className="w-full md:w-1/2 px-4 md:px-8 py-16"
                >
                  <h2 className="text-3xl text-white mb-6 font-extrabold text-center">O nás</h2>
                  <p className="text-white mb-4 font-medium text-2xl text-center">
                    Vitajte v našej autentickej ázijskej reštaurácii v srdci Starej Ľubovne. Naša reštaurácia prináša pravé chute Ázie priamo do vašich tanierov, kde sa stretáva tradícia s moderným kulinárskym umením.
                  </p>
                  <p className="text-white mb-4 font-medium text-2xl text-center">
                    Špecializujeme sa na tradičné ázijské jedlá pripravované podľa pôvodných receptúr a výhradne z čerstvých, poctivo vyberaných surovín. Každé jedlo je pripravené s láskou a vášňou pre ázijskú gastronómiu, ktorú naši šéfkuchári zdokonaľovali roky.
                  </p>
                  <p className="text-white mb-4 font-medium text-2xl text-center">
                    Naša kuchyňa majstrovsky kombinuje starobylé ázijské postupy s modernými technikami, aby vytvorila dokonalý kulinársky zážitok pre všetkých milovníkov exotických chutí. V našom menu nájdete obľúbené jedlá z rôznych kútov Ázie - od pikantných thajských špecialít, cez delikátne japonské sushi, až po bohaté čínske pokrmy a aromatické vietnamské polievky.
                  </p>
                  <p className="text-white mb-4 font-medium text-2xl text-center">
                    Okrem vynikajúceho jedla ponúkame aj príjemné prostredie inšpirované ázijskou kultúrou, kde si môžete vychutnať svoje jedlo v pokojnej atmosfére. Náš profesionálny a priateľský personál sa postará o to, aby váš gastronomický zážitok bol nezabudnuteľný.
                  </p>
                  <p className="text-white font-medium text-2xl text-center">
                    Príďte nás navštíviť a vydajte sa na fascinujúcu chuťovú cestu naprieč Áziou bez toho, aby ste museli opustiť Starú Ľubovňu. Tešíme sa na vašu návštevu a možnosť predstaviť vám to najlepšie z ázijskej kuchyne!
                  </p>
                </div>
            </div>
        </section>
    );
};

export default About;