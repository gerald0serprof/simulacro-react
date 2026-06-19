import { useCallback, useRef, useState } from 'react';

const MODEL_ID = 'Llama-3.2-1B-Instruct-q4f32_1-MLC';

export function useWebLLM() {
  const engineRef = useRef(null);
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState('');

  const loadModel = useCallback(async () => {
    if (engineRef.current) return engineRef.current;

    if (typeof navigator === 'undefined' || !navigator.gpu) {
      setError('Este navegador no soporta WebGPU. Prueba con Chrome o Edge actualizados.');
      return null;
    }

    try {
      setLoading(true);
      setError('');
      setProgressText('Inicializando modelo...');

      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        setError('No se encontró un adaptador WebGPU compatible en este dispositivo.');
        return null;
      }

      const webllm = await import('@mlc-ai/web-llm');

      const mlcEngine = await webllm.CreateMLCEngine(MODEL_ID, {
        initProgressCallback: () => {
            setProgressText('Activando IA local…');
        },
        logLevel: 'INFO',
      });

      engineRef.current = mlcEngine;
      setEngine(mlcEngine);
      setProgressText('Modelo listo.');
      return mlcEngine;
    } catch (err) {
      console.error('Error real cargando WebLLM:', err);
      setError('No se pudo cargar la IA local en este dispositivo. Usaré modo asistido básico.');
      setProgressText('');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { engine, loading, progressText, error, loadModel };
}
