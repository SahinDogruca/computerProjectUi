import type { ImageType, MetricsResponse } from "../types/result";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const fetchMetrics = async (result_id: string): Promise<MetricsResponse> => {
    const response = await fetch(`${BASE_URL}/metrics/${result_id}`);

    if (!response.ok) {
        throw new Error("Result metrics face with an error");
    }

    return await response.json() as MetricsResponse;
}

export const fetchVisualization = (image_type: ImageType, result_id: string | null) => {
    return `${BASE_URL}/visualization/${result_id}`
}