import heroBg from '../assets/hero-bg-2.png';
import pohneBg from '../assets/hero-bg-phone.png';
import FirefliesOverlay from "../components/FirefliesOverlay";

const Mainhero = () => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
    >
      <FirefliesOverlay/>
      {/* Desktop/Tablet background */}
      <img
        src={heroBg}
        alt="Hero Image"
        className="hidden sm:block w-full h-full object-cover object-center"
      />
      {/* Phone background */}
      <img
        src={pohneBg}
        alt="Hero Image"
        className="block sm:hidden w-full h-full object-cover object-center"
      />
    </div>
  );
}

export default Mainhero;
