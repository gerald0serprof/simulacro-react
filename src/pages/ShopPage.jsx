import { foodProducts } from '../data/content';

export default function ShopPage() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Comercio saludable</p>
        <h1>Alimentos para perros, gatos y pequeños roedores</h1>
        <div className="product-grid">
          {foodProducts.map((item) => (
            <article className="product-card" key={item.name}>
              <span className="tag">{item.tag}</span>
              <h2>{item.name}</h2>
              <p>{item.type}</p>
              <strong>{item.price}</strong>
              <button className="button button-primary">Añadir al carrito</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
