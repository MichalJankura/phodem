import Navbar from './components/Navbar'
import './App.css'
import Mainhero from './components/Mainhero'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main>
        <section 
          id="home" 
          className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-background to-secondary/30 overflow-hidden"
        >
          <Mainhero/>
        </section>

        {/* About Section */}
        <About /> 

        {/* Services Section */}
        <Services />

        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  )
}

export default App
