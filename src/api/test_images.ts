import type { ImageInfo } from "../types/test_images";

const BASE_URL = import.meta.env.VITE_API_BASE_URL



export const fetchImages = async (): Promise<ImageInfo[]> => {
    const response = await fetch(`${BASE_URL}/get-test-images`);

    if (!response.ok) {
        throw new Error("Fetch Failed!");
    }

    return response.json();
}