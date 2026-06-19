import { useMemo, useState } from 'react';
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
import { foodProducts } from './data/content';
import AIAssistant from './components/AIAssistant';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...foodProducts[0], quantity: 1 },
    { ...foodProducts[1], quantity: 1 },
  ]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (name, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header cartCount={cartCount} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} cartCount={cartCount} />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/tienda" element={<ShopPage addToCart={addToCart} />} />
          <Route path="/clinicas" element={<FinderPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/acceso" element={<AuthPage />} />
          <Route path="/carrito" element={<CartPage cartItems={cartItems} updateQuantity={updateQuantity} />} />
          <Route path="/ayuda" element={<HelpPage />} />
          <Route path="/conocenos" element={<AboutPage />} />
        </Routes>
      </MainContent>
      <Footer />
      <AIAssistant/>
    </div>
  );
}
