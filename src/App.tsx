import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Mainhero from './components/Mainhero'
import Footer from './components/Footer'
import { PreloadProvider, usePreload } from './hooks/usePreload'

const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Contact = lazy(() => import('./components/Contact'))

const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="text-white text-2xl font-bold">Loading...</div>
  </div>
)

function AppContent() {
  const { assetsLoaded } = usePreload();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (assetsLoaded) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [assetsLoaded]);

  return (
    <div className={`min-h-screen bg-background text-foreground transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main>
        <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
          <Mainhero />
        </section>
        <Suspense fallback={<LoadingPlaceholder />}>
          <About />
          <Services />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <PreloadProvider>
      <AppContent />
    </PreloadProvider>
  )
}

export default App
