import { useMemo, useState } from 'react';
import { foodProducts } from '../data/content';

export default function ShopPage({ addToCart }) {
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'Perros', 'Gatos', 'Roedores'];

  const visibleProducts = useMemo(() => {
    if (filter === 'Todos') return foodProducts;
    return foodProducts.filter((product) => product.type === filter);
  }, [filter]);

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Tienda saludable</p>
        <h1>Alimentación para cada etapa y especie</h1>
        <div className="filter-row">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${filter === item ? 'active' : ''}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <span className="tag">{product.tag}</span>
              <h2>{product.name}</h2>
              <p>{product.type}</p>
              <p className="price-total">{product.price.toFixed(2)} €</p>
              <button className="button button-primary" onClick={() => addToCart(product)}>
                Añadir al carrito
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
