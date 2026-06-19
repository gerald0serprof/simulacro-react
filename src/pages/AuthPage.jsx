import { useState } from 'react';
import { FiLock, FiMail, FiUser, FiHeart } from 'react-icons/fi';

export default function AuthPage() {
  const [mode, setMode] = useState('login');

  return (
    <section className="section">
      <div className="container auth-shell">
        <div className="auth-brand-panel">
          <span className="tag">Área privada</span>
          <h1>Gestiona citas, pedidos y seguimiento clínico desde un único espacio.</h1>
          <p>Accede al historial de tu mascota, revisa compras de alimentación saludable y consulta recordatorios de revisiones.</p>
          <ul className="auth-benefits">
            <li>Seguimiento de citas y tratamientos.</li>
            <li>Historial y avisos personalizados.</li>
            <li>Pedidos y compras en un solo panel.</li>
          </ul>
        </div>
        <div className="auth-form-panel">
          <div className="filter-row auth-tabs">
            <button type="button" className={`filter-chip ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Iniciar sesión</button>
            <button type="button" className={`filter-chip ${mode === 'register' ? 'active' : ''}`} onClick={() => setMode('register')}>Crear cuenta</button>
          </div>
          <form className="auth-card auth-form-card">
            {mode === 'register' && (
              <div className="input-with-icon">
                <FiUser />
                <input id="name" type="text" placeholder="Nombre y apellidos" />
              </div>
            )}
            <div className="input-with-icon">
              <FiMail />
              <input id="email" type="email" placeholder="Correo electrónico" />
            </div>
            <div className="input-with-icon">
              <FiLock />
              <input id="password" type="password" placeholder="Contraseña" />
            </div>
            {mode === 'register' && (
              <div className="input-with-icon">
                <FiHeart />
                <input id="pet" type="text" placeholder="Nombre de tu mascota" />
              </div>
            )}
            <button className="button button-primary" type="submit">
              {mode === 'login' ? 'Entrar al área privada' : 'Crear cuenta'}
            </button>
            <p className="auth-note">Al continuar aceptas nuestras condiciones generales y políticas de privacidad.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
