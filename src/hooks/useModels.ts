import { useEffect, useState } from "react";
import { fetchModels } from "../api";

export const useModels = () => {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModels = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchModels();
      setModels(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  return {
    models,
    loading,
    error,
    loadModels,
  };
};
