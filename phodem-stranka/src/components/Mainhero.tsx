import heroBg from '../assets/hero-bg-2.png';

const Mainhero = () => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={heroBg}
        alt="Hero Image"
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}

export default Mainhero;
