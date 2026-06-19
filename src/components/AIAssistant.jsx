import { useMemo, useState } from 'react';
import {
  FiAlertCircle,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiCpu,
  FiLoader,
  FiMapPin,
  FiMessageCircle,
  FiSend,
  FiX,
  FiZap
} from 'react-icons/fi';
import { useWebLLM } from '../hooks/useWebLLM';
import { nearbyCenters, serviceHighlights } from '../data/content';

const defaultOptions = [
  'Quiero agendar una primera cita',
  'Tengo una duda sobre mi mascota',
  'Encuentra mi clínica más cercana',
  'Explícame vuestros servicios',
];

function getContextualOptions(message) {
  const text = message.toLowerCase();

  if (text.includes('cita') || text.includes('agendar') || text.includes('visita')) {
    return ['Primera cita en Madrid', 'Primera cita en Barcelona', 'Consulta para cachorro'];
  }

  if (text.includes('clínica') || text.includes('clinica') || text.includes('cercana')) {
    return ['Buscar clínica en Madrid', 'Buscar clínica en Valencia', 'Ver sedes disponibles'];
  }

  if (text.includes('servicio') || text.includes('protocolo')) {
    return ['Atención médica avanzada', 'Seguimiento y continuidad', 'Confianza y transparencia'];
  }

  if (
    text.includes('duda') ||
    text.includes('mascota') ||
    text.includes('síntoma') ||
    text.includes('sintoma')
  ) {
    return ['Perro con vómitos', 'Gato sin apetito', 'Consulta preventiva'];
  }

  return [];
}

function findMatchingCenter(message) {
  const text = message.toLowerCase();
  return nearbyCenters.find((center) => {
    const city = center.city?.toLowerCase() || '';
    const name = center.name?.toLowerCase() || '';
    return text.includes(city) || text.includes(name);
  });
}

function findMatchingServices(message) {
  const text = message.toLowerCase();
  return serviceHighlights.filter((service) => {
    const title = service.title?.toLowerCase() || '';
    const body = service.text?.toLowerCase() || '';
    return text.includes(title) || title.includes(text) || body.includes(text);
  });
}

function buildServicesSummary(limit = 3) {
  return serviceHighlights
    .slice(0, limit)
    .map((service) => `${service.title}: ${service.text}`)
    .join(' ');
}

function getFallbackReply(message) {
  const text = message.toLowerCase();
  const matchedCenter = findMatchingCenter(text);
  const matchedServices = findMatchingServices(text);

  if (matchedCenter) {
    return {
      body: `${matchedCenter.name} está en ${matchedCenter.city} y actualmente muestra disponibilidad: ${matchedCenter.availability}. Si quieres, puedo ayudarte a preparar una primera visita para esa sede.`,
      options: [`Primera cita en ${matchedCenter.city}`, 'Ver sedes disponibles', 'Necesito ayuda para reservar'],
    };
  }

  if (matchedServices.length > 0) {
    return {
      body: matchedServices.map((service) => `${service.title}: ${service.text}`).join(' '),
      options: matchedServices.slice(0, 3).map((service) => service.title),
    };
  }

  if (text.includes('sede') || text.includes('clinica') || text.includes('clínica') || text.includes('cercana')) {
    const suggested = nearbyCenters.slice(0, 3)
      .map((center) => `${center.name} en ${center.city} (${center.availability})`)
      .join(', ');

    return {
      body: `Estas son algunas sedes disponibles de VetCare Clinic: ${suggested}. Escríbeme una ciudad concreta y te orientaré mejor.`,
      options: nearbyCenters.slice(0, 3).map((center) => `Buscar clínica en ${center.city}`),
    };
  }

  if (text.includes('cita') || text.includes('agendar') || text.includes('visita')) {
    return {
      body: 'Puedo ayudarte a preparar una primera cita. Indícame tu ciudad, el tipo de mascota y el motivo principal de consulta para proponerte la sede más adecuada.',
      options: ['Primera cita en Madrid', 'Primera cita en Barcelona', 'Consulta para cachorro'],
    };
  }

  if (text.includes('servicio') || text.includes('protocolo')) {
    return {
      body: `VetCare Clinic trabaja con varios pilares asistenciales: ${buildServicesSummary(4)} Si quieres, te explico con más detalle el servicio que más te interese.`,
      options: serviceHighlights.slice(0, 3).map((service) => service.title),
    };
  }

  if (
    text.includes('duda') ||
    text.includes('mascota') ||
    text.includes('síntoma') ||
    text.includes('sintoma')
  ) {
    return {
      body: 'Cuéntame especie, edad y síntoma principal de tu mascota, y te daré una orientación inicial. Si aprecias una urgencia, lo adecuado es acudir al servicio 24/7 de la clínica.',
      options: ['Perro con vómitos', 'Gato sin apetito', 'Consulta preventiva'],
    };
  }

  return {
    body: `Puedo ayudarte con primera cita, dudas generales, búsqueda de clínica cercana y servicios de VetCare Clinic. Por ejemplo, ahora mismo puedo orientarte sobre sedes como ${nearbyCenters[0]?.city}, ${nearbyCenters[1]?.city} o ${nearbyCenters[2]?.city}, y sobre servicios como ${serviceHighlights[0]?.title} o ${serviceHighlights[1]?.title}.`,
    options: [],
  };
}

export default function AIAssistant() {
  const { engine, loading, progressText, error, loadModel } = useWebLLM();
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      title: 'Hola, soy VetCare AI',
      body: 'Puedo ayudarte a contactar con la clínica, agendar una primera visita, encontrar tu sede más cercana y explicarte los servicios de VetCare Clinic. Puedes escribirme directamente o abrir el menú de opciones.',
      options: [],
    },
  ]);

  const messageCountLabel = useMemo(
    () => `${messages.length} mensajes en la conversación`,
    [messages.length]
  );

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const buildConversation = (userMessage, history) => {
    const serviceContext = serviceHighlights
      .slice(0, 6)
      .map((service) => `${service.title}: ${service.text}`)
      .join(' | ');

    const centerContext = nearbyCenters
      .slice(0, 8)
      .map((center) => `${center.name} - ${center.city} - ${center.availability}`)
      .join(' | ');

    const trimmedHistory = history
      .filter((item) => item.role === 'user' || item.role === 'assistant')
      .slice(-6)
      .map((item) => ({
        role: item.role,
        content: item.body,
      }));

    return [
      {
        role: 'system',
        content:
          `Eres VetCare AI, el asistente inteligente de VetCare Clinic. Ayudas a agendar una primera cita, respondes dudas generales sobre mascotas, orientas para encontrar la clínica más cercana en España y explicas servicios y protocolos. Debes ser claro, breve, amable y útil. Si detectas una posible urgencia, recomienda acudir al servicio 24/7 de la clínica. No inventes diagnósticos definitivos. Solo propone opciones cuando aporten valor contextual.\n\nServicios disponibles: ${serviceContext}\n\nClínicas y disponibilidad: ${centerContext}`,
      },
      ...trimmedHistory,
      {
        role: 'user',
        content: userMessage,
      },
    ];
  };

  const appendAssistantMessage = (title, body, userText) => {
    const contextualOptions = getContextualOptions(userText);

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        title,
        body,
        options: contextualOptions,
      },
    ]);
  };

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || thinking || loading) return;

    const updatedMessages = [...messages, { role: 'user', body: content }];
    setMessages(updatedMessages);
    setInput('');
    setThinking(true);
    setShowOptions(false);

    try {
      let activeEngine = engine;

      if (!activeEngine) {
        activeEngine = await loadModel();
      }

      if (activeEngine) {
        const response = await activeEngine.chat.completions.create({
          messages: buildConversation(content, updatedMessages),
          temperature: 0.4,
          max_tokens: 100,
        });

        const reply =
          response?.choices?.[0]?.message?.content ||
          'No he podido generar una respuesta en este momento.';

        appendAssistantMessage('VetCare AI', reply, content);
      } else {
        const fallback = getFallbackReply(content);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            title: 'VetCare AI · modo básico',
            body: fallback.body,
            options: fallback.options,
          },
        ]);
      }
    } catch (e) {
      const fallback = getFallbackReply(content);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          title: 'VetCare AI · modo básico',
          body: fallback.body,
          options: fallback.options,
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
        <aside
          className="assistant-panel"
          id="vetcare-ai-panel"
          aria-label="Asistente inteligente VetCare AI"
        >
          <div className="assistant-header">
            <div>
              <p className="assistant-eyebrow">Asistente en línea</p>
              <h2>VetCare AI</h2>
            </div>
            <button
              type="button"
              className="assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar asistente"
            >
              <FiX />
            </button>
          </div>

          <div className="assistant-status" aria-live="polite">
            <div className="assistant-top-actions">
              <button
                type="button"
                className="assistant-menu-toggle"
                onClick={() => setShowOptions((prev) => !prev)}
                aria-expanded={showOptions}
              >
                {showOptions ? <FiChevronUp /> : <FiChevronDown />}
                {showOptions ? 'Ocultar opciones' : 'Ver opciones'}
              </button>
            </div>

            {showOptions && (
              <div className="assistant-global-options">
                {defaultOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="assistant-chip"
                    onClick={() => sendMessage(option)}
                    disabled={loading || thinking}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="assistant-warning">
                <FiAlertCircle /> {error}
              </p>
            )}

            {thinking && (
              <p>
                <FiLoader className="spin" /> VetCare AI está pensando…
              </p>
            )}
          </div>

          <div
            className="assistant-log"
            role="log"
            aria-live="polite"
            aria-label={messageCountLabel}
          >
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`assistant-message ${message.role}`}
              >
                {message.title && <h3>{message.title}</h3>}
                <p>{message.body}</p>

                {message.options?.length > 0 && message.role === 'assistant' && (
                  <div className="assistant-chips">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="assistant-chip"
                        onClick={() => sendMessage(option)}
                        disabled={loading || thinking}
                      >
                        {option}
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
            <label htmlFor="assistant-input" className="sr-only">
              Escribe tu mensaje al asistente
            </label>

            <input
              id="assistant-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej. Quiero agendar una primera cita en Barcelona"
              disabled={thinking || loading}
            />

            <button
              type="submit"
              className="assistant-send"
              aria-label="Enviar mensaje"
              disabled={thinking || loading}
            >
              <FiSend />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
