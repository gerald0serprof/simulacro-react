import { faqs } from '../data/content';

export default function HelpPage() {
  return (
    <section className="section">
      <div className="container help-grid">
        <div>
          <p className="eyebrow">Ayuda</p>
          <h1>Contacto y preguntas frecuentes</h1>
          <form className="auth-card">
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="Tu nombre" />
            <label htmlFor="message">Consulta</label>
            <textarea id="message" rows="5" placeholder="Escribe tu mensaje" />
            <button className="button button-primary" type="submit">Enviar</button>
          </form>
        </div>
        <div className="faq-list">
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
