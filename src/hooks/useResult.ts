import { useEffect, useState } from "react";
import type { MetricsResponse } from "../types/result";
import { fetchMetrics } from "../api/result";


export const useResult = (resultId: string | null) => {
    const [data, setData] = useState<MetricsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!resultId) return;

        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetchMetrics(resultId);
                setData(res);
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [resultId]);

    return { data, loading, error };
};
