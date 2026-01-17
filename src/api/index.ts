import type { InferenceResponse, ModelDetailResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchModels = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/get/models`);

  if (!response.ok) {
    throw new Error("Models Fetch Failed!");
  }

  return response.json();
};

export const fetchImages = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/get/test-images`);

  if (!response.ok) {
    throw new Error("Test Images fetch Failed!");
  }

  return response.json();
};

export const fetchTestPredict = async (
  model_name: string,
  image_name: string,
  conf_threshold: number = 0.5,
): Promise<InferenceResponse> => {
  const response = await fetch(
    `${BASE_URL}/predict/test?model_name=${model_name}&image_name=${image_name}&conf_threshold=${conf_threshold}`,
  );

  if (!response.ok) {
    throw new Error("Predict Failed!!!");
  }

  return await response.json();
};

export const fetchUploadPredict = async (
  formdata: FormData,
): Promise<InferenceResponse> => {
  const response = await fetch(`${BASE_URL}/predict/upload`, {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    throw new Error("Predict Failed!!!");
  }

  return await response.json();
};

export const fetchModelDetail = async (
  model_name: string,
): Promise<ModelDetailResponse> => {
  const response = await fetch(
    `${BASE_URL}/get/models-info/?model_name=${model_name}`,
  );

  if (!response.ok) {
    throw new Error("Fetching Model Detail Failed!!!");
  }

  return await response.json();
};

export const fetchUploadModel = async (file: File, modelName: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model_name", modelName);

  const response = await fetch(`${BASE_URL}/load/model`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  return await response.json();
};
