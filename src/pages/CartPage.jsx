export default function CartPage({ cartItems, updateQuantity }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="section">
      <div className="container cart-layout">
        <div className="list-stack">
          <p className="eyebrow">Carrito</p>
          <h1>Tu selección saludable</h1>
          {cartItems.length === 0 ? (
            <article className="info-card">
              <p>Tu carrito está vacío en este momento.</p>
            </article>
          ) : (
            cartItems.map((item) => (
              <article className="result-card" key={item.name}>
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.type}</p>
                </div>
                <div className="cart-actions-inline">
                  <button className="button button-secondary" onClick={() => updateQuantity(item.name, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="button button-secondary" onClick={() => updateQuantity(item.name, 1)}>+</button>
                </div>
              </article>
            ))
          )}
        </div>
        <aside className="summary-card info-card">
          <h2>Resumen</h2>
          <p className="price-total">{total.toFixed(2)} €</p>
          <button className="button button-primary">Finalizar compra</button>
        </aside>
      </div>
    </section>
  );
}
