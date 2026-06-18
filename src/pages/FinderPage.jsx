import { nearbyCenters } from '../data/content';

export default function FinderPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Buscador</p>
        <h1>Hospitales y clínicas cercanas</h1>
        <form className="finder-form">
          <label htmlFor="city">Ciudad o código postal</label>
          <input id="city" type="text" placeholder="Ej. Madrid 28001" />
          <button className="button button-primary" type="button">Buscar</button>
        </form>
        <div className="list-stack">
          {nearbyCenters.map((center) => (
            <article className="result-card" key={center.name}>
              <h2>{center.name}</h2>
              <p>{center.city} · {center.distance}</p>
              <p>{center.emergency}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
