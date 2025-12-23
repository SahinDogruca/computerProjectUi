import type { ModelInfo } from "../types/models";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchModels = async (): Promise<ModelInfo[]> => {
    const response = await fetch(`${BASE_URL}/models`);

    if (!response.ok) {
        throw new Error("Fetch Failed!");
    }

    return response.json();
}