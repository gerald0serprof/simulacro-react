import { Link } from 'react-router-dom';
import { FiShoppingBag, FiUser } from 'react-icons/fi';

export default function Header({ cartCount }) {
  return (
    <header className="site-header">
      <div className="container header-top">
        <p>Urgencias 24/7 · Nutrición saludable · Seguimiento personalizado</p>
        <div className="header-mini-actions">
          <Link to="/carrito" className="mini-link pill"><FiShoppingBag /> Carrito ({cartCount})</Link>
        </div>
      </div>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Ir a la página principal de VetCare Plus">
          <span className="brand-mark" aria-hidden="true">✚</span>
          <div>
            <strong>VetCare Clinic</strong>
            <p>Clínica veterinaria y bienestar animal</p>
          </div>
        </Link>
        <div className="header-actions">
          <Link className="button button-primary" to="/acceso"><FiUser /> Acceso área privada</Link>
        </div>
      </div>
    </header>
  );
}
