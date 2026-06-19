import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/tienda', 'Tienda saludable'],
  ['/clinicas', 'Encuentra tu Clínica'],
  ['/blog', 'Blog'],
  ['/carrito', 'Carrito'],
];

export default function Navbar({ menuOpen, setMenuOpen, cartCount }) {
  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="container nav-wrapper">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label="Abrir o cerrar menú"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
          <span>Menú</span>
        </button>
        <div id="main-navigation" className={`nav-list ${menuOpen ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
              {label === 'Carrito' ? ` (${cartCount})` : ''}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
