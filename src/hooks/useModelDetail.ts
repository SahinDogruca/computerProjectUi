import { useEffect, useState } from "react";
import { fetchModelDetail } from "../api";
import type { ModelDetailResponse } from "../types";
import { normalizeMetrics } from "../utils";

export const useModelDetail = (model_name: string) => {
  const [modelDetail, setModelDetail] = useState<ModelDetailResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModelDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: ModelDetailResponse = await fetchModelDetail(model_name);

        const normalizedData: ModelDetailResponse = {
          ...data,
          metrics: normalizeMetrics(data.metrics),
        };

        setModelDetail(normalizedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadModelDetail();
  }, []);

  return {
    modelDetail,
    loading,
    error,
  };
};
