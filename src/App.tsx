import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Mainhero from './components/Mainhero'
import Footer from './components/Footer'
import { PreloadProvider, usePreload } from './hooks/usePreload'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'

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
        <About />
        <Services />
        <Contact />
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
