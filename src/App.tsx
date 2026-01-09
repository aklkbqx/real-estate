import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Properties from './components/Properties';
import InvestmentProcess from './components/InvestmentProcess';
import MarketInsights from './components/MarketInsights';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <Properties />
      <InvestmentProcess />
      <MarketInsights />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default App