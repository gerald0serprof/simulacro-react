import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/tienda', 'Tienda saludable'],
  ['/clinicas', 'Clínicas cercanas'],
  ['/blog', 'Blog'],
  ['/acceso', 'Acceso'],
  ['/carrito', 'Carrito'],
  ['/ayuda', 'Ayuda'],
  ['/conocenos', 'Conócenos'],
];

export default function Navbar() {
  return (
    <nav className="site-nav" aria-label="Navegación principal">
      <div className="container nav-list">
        {links.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
