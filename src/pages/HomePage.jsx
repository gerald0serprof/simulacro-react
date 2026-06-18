import { useState } from 'react';
import { Link } from 'react-router-dom';
import { serviceHighlights, foodProducts, posts } from '../data/content';

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current - 1 + serviceHighlights.length) % serviceHighlights.length);
  const next = () => setCurrent((current + 1) % serviceHighlights.length);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Salud, prevención y nutrición</p>
            <h1>Una experiencia veterinaria clara, cercana y basada en cuidados avanzados.</h1>
            <p className="hero-copy">
              VetCare Plus une atención médica, comunicación continua, tienda saludable y recursos educativos en una sola plataforma.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/servicios">Ver servicios</Link>
              <Link className="button button-secondary" to="/clinicas">Buscar clínica</Link>
            </div>
          </div>
          <div className="hero-card" id="urgencias">
            <h2>Protocolos destacados</h2>
            <ul>
              <li>Urgencias 24/7 y triaje rápido.</li>
              <li>Seguimiento postconsulta con recordatorios.</li>
              <li>Atención integral para perros, gatos y roedores.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">En nuestra clínica encontrarás</p>
              <h2>Nuestros Servicios</h2>
            </div>
            <div className="carousel-controls" aria-label="Controles del carrusel">
              <button className="button button-icon" onClick={prev} aria-label="Imagen anterior">←</button>
              <button className="button button-icon" onClick={next} aria-label="Imagen siguiente">→</button>
            </div>
          </div>
          <div className="carousel" role="region" aria-label="Carrusel de servicios y protocolos">
            <article className="carousel-card">
              <div className="image-placeholder" aria-label={serviceHighlights[current].title}>
                <span>Adjuntar imagen {current + 1}</span>
              </div>
              <div className="carousel-copy">
                <h3>{serviceHighlights[current].title}</h3>
                <p>{serviceHighlights[current].text}</p>
              </div>
            </article>
            <div className="carousel-dots" aria-label="Selector de diapositivas">
              {serviceHighlights.map((item, index) => (
                <button
                  key={item.title}
                  className={`dot ${index === current ? 'active' : ''}`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Ver ${item.title}`}
                  aria-pressed={index === current}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt-section">
        <div className="container cards-grid">
          <article className="info-card">
            <h2>Tienda saludable</h2>
            <p>Selección de alimentos y snacks por especie, con foco en nutrición de calidad.</p>
            <ul>{foodProducts.slice(0, 3).map((p) => <li key={p.name}>{p.name} · {p.type}</li>)}</ul>
          </article>
          <article className="info-card">
            <h2>Blog de salud</h2>
            <p>Consejos breves para prevención, alimentación y bienestar diario.</p>
            <ul>{posts.map((p) => <li key={p.title}>{p.title}</li>)}</ul>
          </article>
          <article className="info-card">
            <h2>Ayuda y confianza</h2>
            <p>FAQ, contacto y documentos clave en un entorno accesible y comprensible.</p>
            <Link className="text-link" to="/ayuda">Ir a ayuda</Link>
          </article>
        </div>
      </section>
    </>
  );
}
