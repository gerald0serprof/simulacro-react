import { useMemo, useState } from 'react';
import { FiCalendar, FiMapPin, FiMessageCircle, FiSend, FiX, FiZap } from 'react-icons/fi';
import { nearbyCenters, serviceHighlights } from '../data/content';

const quickActions = [
  'Quiero agendar una primera cita',
  'Tengo una duda sobre mi mascota',
  'Encuentra mi clínica más cercana',
  'Explícame vuestros servicios',
];

const serviceSummary = serviceHighlights.map((item) => `• ${item.title}: ${item.text}`).join('\n');

function buildReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes('cita') || lower.includes('agendar') || lower.includes('visita')) {
    return {
      title: 'Primera cita en VetCare Clinic',
      body: 'Puedo ayudarte a preparar una primera visita. Indícame la ciudad en la que buscas atención y si prefieres disponibilidad para hoy, mañana o esta semana. También puedes dejarnos el nombre de tu mascota, especie y motivo principal de consulta.',
      chips: ['Madrid · hoy', 'Barcelona · mañana', 'Primera revisión cachorro'],
    };
  }

  if (lower.includes('clínica') || lower.includes('clinica') || lower.includes('cercana') || lower.includes('ciudad')) {
    const suggestions = nearbyCenters.slice(0, 4).map((center) => `${center.name} · ${center.city} · ${center.availability}`);
    return {
      title: 'Clínicas disponibles',
      body: `Estas son algunas sedes disponibles ahora mismo:\n${suggestions.map((item) => `• ${item}`).join('\n')}\n\nSi me dices tu ciudad, te sugiero la opción más cercana.`,
      chips: nearbyCenters.slice(0, 4).map((center) => center.city),
    };
  }

  if (lower.includes('servicio') || lower.includes('protocolo') || lower.includes('atención') || lower.includes('atencion')) {
    return {
      title: 'Servicios y protocolos VetCare Clinic',
      body: `Trabajamos con un modelo integral de clínica veterinaria:\n${serviceSummary}\n\nSi quieres, te explico cuál encaja mejor con una primera visita, seguimiento o revisión preventiva.`,
      chips: ['Atención médica avanzada', 'Seguimiento y continuidad', 'Confianza y transparencia'],
    };
  }

  if (lower.includes('duda') || lower.includes('inquietud') || lower.includes('síntoma') || lower.includes('sintoma') || lower.includes('mascota')) {
    return {
      title: 'Orientación inicial',
      body: 'Puedo darte una orientación general sobre síntomas, prevención, alimentación o preparación de consulta. Para ayudarte mejor, dime especie, edad, síntoma principal y desde cuándo ocurre. Si es una urgencia, contacta directamente con el servicio 24/7 de la clínica.',
      chips: ['Perro con vómitos', 'Gato sin apetito', 'Consulta preventiva'],
    };
  }

  return {
    title: 'Asistente VetCare AI',
    body: 'Puedo ayudarte a contactar con la clínica, preparar una primera cita, encontrar la sede más cercana y explicarte nuestros servicios. Escríbeme qué necesitas o pulsa una acción rápida.',
    chips: quickActions,
  };
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      title: 'Hola, soy VetCare AI',
      body: 'Estoy aquí para ayudarte a contactar con nuestra clínica, agendar una primera visita, resolver dudas frecuentes, encontrar tu sede más cercana y explicarte nuestros servicios.',
      chips: quickActions,
    },
  ]);

  const messageCountLabel = useMemo(() => `${messages.length} mensajes en la conversación`, [messages.length]);

  const sendMessage = (text) => {
    const content = text.trim();
    if (!content) return;
    const reply = buildReply(content);
    setMessages((prev) => [
      ...prev,
      { role: 'user', body: content },
      { role: 'assistant', ...reply },
    ]);
    setInput('');
  };

  return (
    <>
      <button
        type="button"
        className="assistant-launcher"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="vetcare-ai-panel"
        aria-label={open ? 'Cerrar asistente inteligente' : 'Abrir asistente inteligente'}
      >
        {open ? <FiX /> : <FiMessageCircle />}
        <span>VetCare AI</span>
      </button>

      {open && (
        <aside className="assistant-panel" id="vetcare-ai-panel" aria-label="Asistente inteligente VetCare AI">
          <div className="assistant-header">
            <div>
              <p className="assistant-eyebrow">Asistente</p>
              <h2>VetCare AI</h2>
            </div>
            <button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <FiX />
            </button>
          </div>

          <div className="assistant-capabilities">
            <span><FiCalendar /> Primera cita</span>
            <span><FiMapPin /> Clínicas</span>
            <span><FiZap /> Servicios</span>
          </div>

          <div className="assistant-log" role="log" aria-live="polite" aria-label={messageCountLabel}>
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`assistant-message ${message.role}`}>
                {message.title && <h3>{message.title}</h3>}
                <p>{message.body}</p>
                {message.chips && message.role === 'assistant' && (
                  <div className="assistant-chips">
                    {message.chips.map((chip) => (
                      <button key={chip} type="button" className="assistant-chip" onClick={() => sendMessage(chip)}>
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <form
            className="assistant-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <label htmlFor="assistant-input" className="sr-only">Escribe tu mensaje al asistente</label>
            <input
              id="assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej. Quiero agendar una primera cita en Madrid"
            />
            <button type="submit" className="assistant-send" aria-label="Enviar mensaje">
              <FiSend />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
