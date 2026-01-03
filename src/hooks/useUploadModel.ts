import { useState } from "react";
import { fetchUploadModel } from "../api";
import { type UploadModelResponse } from "../types";

export const useUploadModel = () => {
  const [response, setResponse] = useState<UploadModelResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadModel = async (file: File, model_name: string) => {
    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const data = await fetchUploadModel(file, model_name);
      setResponse(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    uploadModel: uploadModel,
  };
};
