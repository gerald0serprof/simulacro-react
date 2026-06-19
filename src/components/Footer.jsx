import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>VetCare Clinic</h2>
          <p>Atención avanzada, nutrición saludable y acompañamiento continuo para mascotas y familias.</p>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>Madrid · Tel. 900 000 000</p>
          <p>Email: hola@vetcareclinic.es</p>
        </div>
        <div>
          <h3>Navegación útil</h3>
          <div className="footer-links">
            <Link to="/ayuda">Ayuda</Link>
            <Link to="/conocenos">Conócenos</Link>
            <Link to="/acceso">Acceso área privada</Link>
            <a href="#privacidad">Política de Privacidad</a>
            <a href="#acerca-de">Acerca de</a>
          </div>
        </div>
        <div>
          <h3>Redes sociales</h3>
          <div className="social-links" aria-label="Redes sociales">
            <a href="#instagram" aria-label="Instagram" className="social-link"><FaInstagram /></a>
            <a href="#facebook" aria-label="Facebook" className="social-link"><FaFacebookF /></a>
            <a href="#x" aria-label="X o Twitter" className="social-link"><FaXTwitter /></a>
            <a href="#youtube" aria-label="YouTube" className="social-link"><FaYoutube /></a>
            <a href="#linkedin" aria-label="LinkedIn" className="social-link"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 VetCare Clinic . Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
