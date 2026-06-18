import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Ir a la página principal de VetCare Clinic">
          <span className="brand-mark" aria-hidden="true">✚</span>
          <div>
            <h2><strong>VetCare Clinic</strong></h2>
            <p>Clínica veterinaria y bienestar animal</p>
          </div>
        </Link>
        <div className="header-actions">
          <a className="pill" href="#urgencias">Urgencias 24/7</a>
          <Link className="button button-primary" to="/acceso">Área privada</Link>
        </div>
      </div>
    </header>
  );
}