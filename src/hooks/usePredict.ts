import { useState } from "react";
import type { InferenceResponse } from "../types";
import { fetchTestPredict, fetchUploadPredict } from "../api";

export const usePredict = () => {
  const [results, setResults] = useState<InferenceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTestPredict = async (
    model_name: string,
    image_name: string,
    conf_threshold: number = 0.5,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data: InferenceResponse = await fetchTestPredict(
        model_name,
        image_name,
        conf_threshold,
      );

      setResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const loadUploadPredict = async (
    imageFile: File,
    modelName: string,
    confThreshold: number = 0.5,
    chartConfThreshold: number = 0.001,
    gtFile?: File,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("model_name", modelName);
      formData.append("conf_threshold", confThreshold.toString());
      formData.append("chart_conf_threshold", chartConfThreshold.toString());

      if (gtFile) {
        formData.append("gt_file", gtFile);
      }

      const data = await fetchUploadPredict(formData);
      setResults(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    fetchPredictTest: loadTestPredict,
    fetchUploadTest: loadUploadPredict,
  };
};

export type UsePredictReturn = ReturnType<typeof usePredict>;
