import { useCallback, useState } from "react"
import { predictTest, predictUpload } from "../api/predict";


type PredictParams =
    | { type: "test_set"; model_name: string; image_name: string }
    | { type: "upload"; model_name: string; file: File };

export const usePredict = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const predict = useCallback(async (params: PredictParams) => {
        try {
            setResult(null);
            setLoading(true);
            setError(null);

            let data;
            if (params.type === "test_set") {
                data = await predictTest(params.model_name, params.image_name);
            } else {
                data = await predictUpload(params.model_name, params.file);
            }

            setResult(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }

    }, []);



    return {
        result,
        loading,
        error,
        predict
    }
}