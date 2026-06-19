import { useCallback, useRef, useState } from 'react';

const MODEL_ID = 'Llama-3.2-1B-Instruct-q4f32_1-MLC';

export function useWebLLM() {
  const engineRef = useRef(null);
  const [engine, setEngine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState('');

  const loadModel = useCallback(async () => {
    if (engineRef.current) return engineRef.current;
    if (typeof navigator === 'undefined' || !navigator.gpu) {
      setError('Tu navegador o dispositivo no soporta WebGPU.');
      return null;
    }

    try {
      setLoading(true);
      setError('');
      setProgressText('Inicializando modelo...');

      const webllm = await import('@mlc-ai/web-llm');
      const mlcEngine = await webllm.CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (report) => {
          const percent = report.progress ? Math.round(report.progress * 100) : 0;
          setProgressText(`${report.text || 'Cargando modelo'} ${percent}%`);
        },
        logLevel: 'INFO',
      });

      engineRef.current = mlcEngine;
      setEngine(mlcEngine);
      setLoaded(true);
      setProgressText('Modelo listo.');
      return mlcEngine;
    } catch (err) {
      setError('No se pudo cargar el modelo WebLLM en este dispositivo.');
      setProgressText('');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { engine, loading, loaded, progressText, error, loadModel };
}
