import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import AudienceCards from './components/AudienceCards';
import Testimonials from './components/Testimonials';
import Writing from './components/Writing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import QuietLineBridge from './components/QuietLineBridge';
import { motion, useScroll, useTransform } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  
  // Keep background warm and bright throughout the scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ['var(--bg-base)', 'var(--bg-parchment)']
  );

  return (
    <Router>
      <motion.div style={{ backgroundColor, minHeight: '100vh', transition: 'background-color 0.5s ease-out' }}>
        <Navigation />
        <main>
          <Hero />
          <About />
          <AudienceCards />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        <QuietLineBridge />
      </motion.div>
    </Router>
  );
}

export default App;
