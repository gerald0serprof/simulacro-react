import { useMemo, useState } from 'react';
import { FiMapPin, FiClock, FiSearch } from 'react-icons/fi';
import { nearbyCenters } from '../data/content';

export default function FinderPage() {
  const [city, setCity] = useState('Todas');
  const [availability, setAvailability] = useState('Todas');
  const [query, setQuery] = useState('');

  const cities = ['Todas', ...new Set(nearbyCenters.map((center) => center.city))];
  const availabilities = ['Todas', ...new Set(nearbyCenters.map((center) => center.availability))];

  const filteredCenters = useMemo(() => {
    return nearbyCenters.filter((center) => {
      const matchCity = city === 'Todas' || center.city === city;
      const matchAvailability = availability === 'Todas' || center.availability === availability;
      const matchQuery = !query || [center.name, center.zone, center.city].join(' ').toLowerCase().includes(query.toLowerCase());
      return matchCity && matchAvailability && matchQuery;
    });
  }, [city, availability, query]);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Buscador</p>
        <h1>Encuentra tu Clínica</h1>
        <p className="section-intro">Busca por ciudad, disponibilidad o barrio para localizar la sede veterinaria que mejor encaja contigo.</p>
        <form className="finder-panel" onSubmit={(e) => e.preventDefault()}>
          <div className="field-group">
            <label htmlFor="search-clinic">Buscar sede</label>
            <div className="input-with-icon">
              <FiSearch />
              <input id="search-clinic" type="text" placeholder="Ej. VetCare Madrid o Retiro" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="city-filter">Ciudad</label>
            <select id="city-filter" value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="availability-filter">Disponibilidad</label>
            <select id="availability-filter" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              {availabilities.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </form>
        <div className="results-summary">{filteredCenters.length} clínica(s) encontrada(s) en España</div>
        <div className="clinic-grid">
          {filteredCenters.map((center) => (
            <article className="clinic-card" key={center.name}>
              <span className="tag">{center.availability}</span>
              <h2>{center.name}</h2>
              <p><FiMapPin /> {center.city} · {center.zone}</p>
              <p><FiClock /> {center.distance}</p>
              <button className="button button-secondary">Ver detalles</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
