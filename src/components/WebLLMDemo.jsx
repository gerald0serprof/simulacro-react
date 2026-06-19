import { useState } from 'react';
import { useWebLLM } from '../hooks/useWebLLM';

export default function WebLLMDemo() {
  const { engine, loading, progressText, error } = useWebLLM();
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [asking, setAsking] = useState(false);

  const handleAsk = async () => {
    if (!engine || !prompt.trim()) return;

    try {
      setAsking(true);
      setAnswer('');

      const response = await engine.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Eres VetCare AI, asistente de una clínica veterinaria. Ayudas con citas, dudas, sedes y servicios.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      setAnswer(response.choices?.[0]?.message?.content || 'Sin respuesta.');
    } catch (e) {
      setAnswer('Hubo un error al generar la respuesta.');
    } finally {
      setAsking(false);
    }
  };

  return (
    <section className="info-card">
      <h2>Demo WebLLM</h2>

      {loading && <p>Cargando modelo: {progressText}</p>}
      {error && <p>{error}</p>}
      {!loading && !error && engine && <p>Modelo cargado correctamente.</p>}

      <textarea
        rows="4"
        placeholder="Ej. Quiero agendar una primera cita en Madrid"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="button button-primary"
        onClick={handleAsk}
        disabled={!engine || asking}
      >
        {asking ? 'Pensando...' : 'Preguntar al modelo'}
      </button>

      {answer && (
        <div className="info-card" style={{ marginTop: '1rem' }}>
          <h3>Respuesta</h3>
          <p>{answer}</p>
        </div>
      )}
    </section>
  );
}
