import { serviceHighlights } from '../data/content';

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Servicios</p>
        <h1>Un modelo de atención veterinaria completo</h1>
        <div className="services-grid">
          {serviceHighlights.map((service) => (
            <article className="info-card" key={service.title}>
              <img src={service.image} alt={service.alt} className="carousel-image" loading="lazy" />
              <div className="carousel-copy">
                <h2>{service.title}</h2>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
