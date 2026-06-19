import { useMemo, useState } from 'react';
import { FiCalendar, FiCpu, FiLoader, FiMapPin, FiMessageCircle, FiSend, FiX, FiZap } from 'react-icons/fi';
import { useWebLLM } from '../hooks/useWebLLM';

const quickActions = [
  'Quiero agendar una primera cita en Madrid',
  'Tengo una duda sobre mi mascota',
  'Encuentra mi clínica más cercana',
  'Explícame vuestros servicios y protocolos',
];

export default function AIAssistant() {
  const { engine, loading, loaded, progressText, error, loadModel } = useWebLLM();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      title: 'Hola, soy VetCare AI',
      body: 'Puedo ayudarte a contactar con la clínica, agendar una primera visita, encontrar tu sede más cercana y explicarte los servicios de VetCare Clinic. Pulsa “Activar IA local” para cargar el modelo solo cuando lo necesites.',
      chips: quickActions,
    },
  ]);

  const messageCountLabel = useMemo(() => `${messages.length} mensajes en la conversación`, [messages.length]);

  const handleToggle = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen && !engine && !loading && !loaded) {
      await loadModel();
    }
  };

  const buildConversation = (userMessage, history) => {
    const previous = history
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .map((item) => ({
        role: item.role,
        content: item.body,
      }));

    return [
      {
        role: 'system',
        content:
          'Eres VetCare AI, el asistente inteligente de VetCare Clinic. Ayudas a agendar una primera cita, respondes dudas generales sobre mascotas, orientas para encontrar la clínica más cercana en España y explicas servicios y protocolos como atención médica avanzada, experiencia del paciente y dueño, comunicación personalizada, seguimiento y continuidad, confianza y transparencia. Debes ser claro, breve, amable y útil. Si detectas una urgencia posible, recomienda acudir al servicio 24/7 de la clínica. No inventes diagnósticos definitivos.',
      },
      ...previous,
      {
        role: 'user',
        content: userMessage,
      },
    ];
  };

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || thinking) return;

    let activeEngine = engine;
    if (!activeEngine) {
      activeEngine = await loadModel();
    }
    if (!activeEngine) return;

    const updatedMessages = [...messages, { role: 'user', body: content }];
    setMessages(updatedMessages);
    setInput('');
    setThinking(true);

    try {
      const response = await activeEngine.chat.completions.create({
        messages: buildConversation(content, updatedMessages),
      });

      const reply = response?.choices?.[0]?.message?.content || 'No he podido generar una respuesta en este momento.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          title: 'VetCare AI',
          body: reply,
          chips: quickActions,
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          title: 'Error del modelo local',
          body: 'No se pudo consultar el modelo local en este momento. Prueba de nuevo o revisa si tu navegador soporta WebGPU.',
          chips: quickActions,
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="assistant-launcher"
        onClick={handleToggle}
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
              <p className="assistant-eyebrow">Asistente inteligente</p>
              <h2>VetCare AI</h2>
            </div>
            <button type="button" className="assistant-close" onClick={() => setOpen(false)} aria-label="Cerrar asistente">
              <FiX />
            </button>
          </div>



          <div className="assistant-status" aria-live="polite">
            {!engine && !loading && !error && (
              <button type="button" className="button button-secondary assistant-activate" onClick={loadModel}>
                Activar IA local
              </button>
            )}
            {loading && <p><FiLoader className="spin" /> Cargando modelo local: {progressText}</p>}
            {!loading && engine && <p>Modelo local listo para responder.</p>}
            {error && <p>{error}</p>}
            {thinking && <p><FiLoader className="spin" /> VetCare AI está pensando…</p>}
          </div>

          <div className="assistant-log" role="log" aria-live="polite" aria-label={messageCountLabel}>
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`assistant-message ${message.role}`}>
                {message.title && <h3>{message.title}</h3>}
                <p>{message.body}</p>
                {message.chips && message.role === 'assistant' && (
                  <div className="assistant-chips">
                    {message.chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className="assistant-chip"
                        onClick={() => sendMessage(chip)}
                        disabled={loading || thinking}
                      >
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
              placeholder="Ej. Quiero agendar una primera cita en Barcelona"
              disabled={loading || thinking}
            />
            <button type="submit" className="assistant-send" aria-label="Enviar mensaje" disabled={loading || thinking}>
              <FiSend />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
