import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import EssayPage from './components/EssayPage';
import EssayIndex from './components/EssayIndex';

function HomePage() {
  return (
    <>
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
    </>
  );
}

function App() {
  // Note: we deliberately do NOT animate page background on scroll. The previous
  // setup combined a framer-motion useTransform with a CSS transition on the
  // same property, which caused a constant ~0.5s lag during scroll and felt
  // janky on mobile. Static base color + per-section gradients is smoother.
  return (
    <Router>
      <ScrollProgress />
      <div
        style={{
          backgroundColor: 'var(--bg-base)',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writing" element={<EssayIndex />} />
          <Route path="/writing/:slug" element={<EssayPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
