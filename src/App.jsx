import { BrowserRouter as Router } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Library from './components/Library';
import AudienceCards from './components/AudienceCards';
import Testimonials from './components/Testimonials';
import Writing from './components/Writing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import QuietLineBridge from './components/QuietLineBridge';
import AmbientBackground from './components/AmbientBackground';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const { scrollYProgress } = useScroll();

  // Subtle drift between two warm page tones across the whole scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['var(--bg-base)', 'var(--bg-parchment)', 'var(--bg-base)']
  );

  return (
    <Router>
      <ScrollProgress />
      <motion.div
        style={{
          backgroundColor,
          minHeight: '100vh',
          transition: 'background-color 0.5s ease-out',
          position: 'relative',
        }}
      >
        <AmbientBackground />
        <Navigation />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Library />
          <AudienceCards />
          <Testimonials />
          <Writing />
          <Newsletter />
        </main>
        <Footer />
        <QuietLineBridge />
      </motion.div>
    </Router>
  );
}

export default App;
