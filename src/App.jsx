import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';
import FinderPage from './pages/FinderPage';
import BlogPage from './pages/BlogPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/clinicas" element={<FinderPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/acceso" element={<AuthPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/conocenos" element={<AboutPage />} />
        </Routes>
      </MainContent>
      <Footer />
    </div>
  );
}