import { foodProducts } from '../data/content';

export default function CartPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Carrito</p>
        <h1>Resumen de compra</h1>
        <div className="list-stack">
          {foodProducts.slice(0, 2).map((item) => (
            <article className="result-card" key={item.name}>
              <h2>{item.name}</h2>
              <p>{item.type}</p>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
