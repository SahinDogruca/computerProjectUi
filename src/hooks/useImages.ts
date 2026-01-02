import { useEffect, useState } from "react"
import { fetchImages } from "../api";


export const useImages = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchImages();
        setImages(data);
      } catch(err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  return {
    images,
    loading,
    error
  }
}
