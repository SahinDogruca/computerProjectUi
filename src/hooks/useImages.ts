import { useCallback, useEffect, useState } from "react";
import { fetchImages } from "../api/test_images";
import type { ImageInfo } from "../types/test_images";

type useImagesType = {
    images: ImageInfo[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useImages = (): useImagesType => {
    const [images, setImages] = useState<ImageInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const loadImages = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchImages();
            setImages(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    return {
        images,
        loading,
        error,
        refetch: loadImages
    }
}