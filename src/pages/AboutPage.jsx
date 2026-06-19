export default function AboutPage() {
  return (
    <section className="section">
      <div className="container about-grid">
        <article className="info-card">
          <p className="eyebrow">Conócenos</p>
          <h1>Una clínica pensada para cuidar mejor</h1>
          <p>
            VetCare Clinic nace con una visión integral: combinar medicina veterinaria avanzada,
            atención humana cercana y acompañamiento continuo en cada etapa de la vida de la mascota.
          </p>
        </article>
        <article className="info-card">
          <h2>Nuestro enfoque</h2>
          <ul>
            <li>Atención médica avanzada.</li>
            <li>Comunicación clara y transparente.</li>
            <li>Seguimiento continuado tras consulta o cirugía.</li>
            <li>Servicios complementarios de nutrición y prevención.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
