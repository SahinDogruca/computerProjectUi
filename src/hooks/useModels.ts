import { useEffect, useState } from "react"
import type { ModelInfo } from "../types/models"
import { fetchModels } from "../api/models";


export const useModels = () => {
    const [models, setModels] = useState<ModelInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const loadModels = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await fetchModels();
                setModels(data);

            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            } finally {
                setLoading(false);
            }

        }

        loadModels();
    }, []);

    return {
        models,
        loading,
        error,
        refecth: async () => {
            setLoading(true);
            const data = await fetchModels();
            setModels(data);
            setLoading(false);
        }
    }
}