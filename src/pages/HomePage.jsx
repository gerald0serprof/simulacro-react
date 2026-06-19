import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi';
import { serviceHighlights, foodProducts, posts } from '../data/content';

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return undefined;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % serviceHighlights.length);
    }, 5000);
    return () => clearInterval(id);
  }, [playing]);

  const prev = () => setCurrent((current - 1 + serviceHighlights.length) % serviceHighlights.length);
  const next = () => setCurrent((current + 1) % serviceHighlights.length);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Clínica, prevención y nutrición</p>
            <h1>Veterinaria moderna con atención cercana y experiencia pensada para mascotas y familias.</h1>
            <p className="hero-copy">
              VetCare Clinic combina medicina avanzada, tienda saludable, seguimiento continuo y educación sanitaria en una sola experiencia digital.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/servicios">Explorar servicios</Link>
              <Link className="button button-secondary" to="/clinicas">Encuentra tu Clínica</Link>
            </div>
            <div className="hero-stats" aria-label="Indicadores de valor">
              <div><strong>24/7</strong><span>Urgencias</span></div>
              <div><strong>+8</strong><span>Sedes en España</span></div>
              <div><strong>360º</strong><span>Cuidado integral</span></div>
            </div>
          </div>
          <div className="hero-card" id="urgencias">
            <img src={serviceHighlights[0].image} alt={serviceHighlights[0].alt} className="hero-image" loading="eager" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">En nuestra clínica encontrarás</p>
              <h2>Servicios de calidad</h2>
            </div>
            <button className="button button-secondary" onClick={() => setPlaying((v) => !v)} aria-label={playing ? 'Pausar carrusel' : 'Reanudar carrusel'}>
              {playing ? <FiPause /> : <FiPlay />} {playing ? 'Pausar' : 'Reanudar'}
            </button>
          </div>
          <div className="carousel outer-arrows" role="region" aria-roledescription="carousel" aria-label="Carrusel de servicios y protocolos">
            <button className="carousel-edge left" onClick={prev} aria-label="Imagen anterior"><FiChevronLeft /></button>
            <article className="carousel-card enhanced-carousel-card">
              <img
                src={serviceHighlights[current].image}
                alt={serviceHighlights[current].alt}
                className="carousel-image"
                loading="lazy"
              />
              <div className="carousel-copy">
                <span className="tag">Servicio destacado</span>
                <h3>{serviceHighlights[current].title}</h3>
                <p>{serviceHighlights[current].text}</p>
              </div>
            </article>
            <button className="carousel-edge right" onClick={next} aria-label="Imagen siguiente"><FiChevronRight /></button>
          </div>
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
      </section>

      <section className="section alt-section">
        <div className="container cards-grid">
          <article className="info-card feature-card">
            <h2>Tienda saludable</h2>
            <p>Compra alimentos por especie y necesidad, con una selección pensada para bienestar y prevención.</p>
            <ul>{foodProducts.slice(0, 4).map((p) => <li key={p.name}>{p.name} · {p.type}</li>)}</ul>
            <Link className="text-link" to="/tienda">Ir a la tienda</Link>
          </article>
          <article className="info-card feature-card">
            <h2>Encuentra tu Clínica</h2>
            <p>Filtra por ciudad y disponibilidad para localizar la sede más adecuada para tu mascota.</p>
            <Link className="text-link" to="/clinicas">Buscar sedes</Link>
          </article>
          <article className="info-card feature-card">
            <h2>Blog de salud</h2>
            <p>Consejos prácticos para prevención, alimentación y cuidados en casa.</p>
            <ul>{posts.slice(0, 3).map((p) => <li key={p.title}>{p.title}</li>)}</ul>
            <Link className="text-link" to="/blog">Ir al blog</Link>
          </article>
        </div>
      </section>
    </>
  );
}
