import { FiHelpCircle, FiMail, FiMessageSquare, FiPhone, FiUser, FiCalendar } from 'react-icons/fi';
import { faqs } from '../data/content';

export default function HelpPage() {
  return (
    <section className="section help-section-alt">
      <div className="container help-shell">
        <div className="help-intro-card">
          <span className="tag">Ayuda</span>
          <h1>Contacta con nuestro equipo</h1>
          <p>Te ayudamos con citas, pedidos, incidencias del área privada, seguimiento clínico y consultas generales.</p>
          <div className="help-points">
            <p><FiPhone /> Atención telefónica prioritaria</p>
            <p><FiMail /> Respuesta por email</p>
            <p><FiCalendar /> Gestión de citas y cambios</p>
          </div>
        </div>
        <div className="help-form-card">
          <form className="support-form">
            <div className="support-grid">
              <div className="field-group">
                <label htmlFor="support-name">Nombre</label>
                <div className="input-with-icon"><FiUser /><input id="support-name" type="text" placeholder="Tu nombre" /></div>
              </div>
              <div className="field-group">
                <label htmlFor="support-email">Correo electrónico</label>
                <div className="input-with-icon"><FiMail /><input id="support-email" type="email" placeholder="nombre@correo.es" /></div>
              </div>
              <div className="field-group">
                <label htmlFor="support-phone">Teléfono</label>
                <div className="input-with-icon"><FiPhone /><input id="support-phone" type="tel" placeholder="600 000 000" /></div>
              </div>
              <div className="field-group">
                <label htmlFor="support-topic">Motivo</label>
                <div className="input-with-icon"><FiHelpCircle /><select id="support-topic"><option>Cita veterinaria</option><option>Pedido o tienda</option><option>Área privada</option><option>Consulta general</option></select></div>
              </div>
            </div>
            <div className="field-group">
              <label htmlFor="support-message">Mensaje</label>
              <div className="input-with-icon textarea-box"><FiMessageSquare /><textarea id="support-message" rows="6" placeholder="Cuéntanos en qué podemos ayudarte" /></div>
            </div>
            <button className="button button-primary" type="submit">Enviar solicitud</button>
          </form>
        </div>
      </div>
      <div className="container faq-block">
        <h2>Preguntas frecuentes</h2>
        <div className="faq-list faq-grid">
          {faqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
