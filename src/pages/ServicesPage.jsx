import { serviceHighlights } from '../data/content';

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Servicios clínicos</p>
        <h1>Atención veterinaria organizada por valor asistencial</h1>
        <div className="cards-grid services-grid">
          {serviceHighlights.map((service) => (
            <article className="info-card" key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
