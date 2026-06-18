export default function AuthPage() {
  return (
    <section className="section">
      <div className="container auth-layout">
        <div>
          <p className="eyebrow">Registro e inicio de sesión</p>
          <h1>Acceso para dueños de mascotas</h1>
          <p>Zona preparada para consultar citas, seguimientos, compras y avisos personalizados.</p>
        </div>
        <form className="auth-card">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" placeholder="nombre@correo.es" />
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" placeholder="••••••••" />
          <button className="button button-primary" type="submit">Entrar</button>
          <button className="button button-secondary" type="button">Crear cuenta</button>
        </form>
      </div>
    </section>
  );
}
