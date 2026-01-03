import { useState } from "react";
import { fetchUploadModel } from "../api";

export const useUploadModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadModel = async (file: File, model_name: string) => {
    try {
      setLoading(true);
      setError(null);

      await fetchUploadModel(file, model_name);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadModel: uploadModel,
  };
};
