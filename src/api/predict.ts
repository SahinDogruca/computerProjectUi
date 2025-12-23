
const BASE_URL = import.meta.env.VITE_API_BASE_URL


export const predictUpload = async (model_name: string, image: File) => {
    const formData = new FormData();

    formData.append("model_name", model_name);
    formData.append("conf_threshold", "0.25");
    formData.append("iou_threshold", "0.45");
    formData.append("image_file", image);


    const response = await fetch(`${BASE_URL}/predict/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("post failed");
    }

    return await response.json();
}

export const predictTest = async (model_name: string, image_name: string) => {
    const body = {
        model_name: model_name, image_path: image_name, image_source: "test_set"
    }
    console.log(body);
    const response = await fetch(`${BASE_URL}/predict/test`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error("post failed")
    }

    return await response.json();
}