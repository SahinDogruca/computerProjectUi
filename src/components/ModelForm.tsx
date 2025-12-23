import React, { useRef, useState } from "react";
import { useModels } from "../hooks/useModels";
import { useImages } from "../hooks/useImages";
import { usePredict } from "../hooks/usePredict";
import { useSearchParams } from "react-router";

const ModelForm = () => {
  const { models, loading: modelsLoading, error: modelsError } = useModels();
  const { images, loading: imagesLoading, error: imagesError } = useImages();
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  const [setSearchParams] = useSearchParams();

  const {
    result,
    loading: resultLoading,
    error: resultError,
    predict,
  } = usePredict();

  if (modelsError || imagesError) {
    return <div>There is an error</div>;
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedModel || (!selectedImage && !uploadedImage)) {
      return;
    }

    if (selectedImage && !uploadedImage) {
      await predict({
        type: "test_set",
        model_name: selectedModel,
        image_name: selectedImage,
      });
    } else if (uploadedImage && !selectedImage) {
      await predict({
        type: "upload",
        model_name: selectedModel,
        file: uploadedImage,
      });
    }

    if (result) {
      setSearchParams(`?result_id=${result.result_id}`);
    }
  };

  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <select
          value={selectedModel}
          id=""
          className="border-sky-300 border-2 rounded-xl px-5 py-2 text-blue-950"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedModel(e.target.value)
          }
          disabled={modelsLoading || resultLoading}
        >
          <option value="">Model Seçiniz</option>
          {modelsLoading ? (
            <option>loading</option>
          ) : (
            models.map((model) => (
              <option
                disabled={!model.loaded}
                className="disabled:bg-gray-200"
                value={model.name}
              >
                {model.name}
              </option>
            ))
          )}
        </select>
      </div>

      <div className="flex justify-center align-middle">
        {uploadedImage ? (
          <div
            className="w-50 text-center py-2 border-2 border-sky-300 rounded-xl text-gray-400 cursor-not-allowed"
            onClick={() => setUploadedImage(null)}
          >
            {uploadedImage.name}
          </div>
        ) : (
          <select
            value={selectedImage}
            className="border-sky-300 border-2 rounded-xl px-5 py-2 text-blue-950"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedImage(e.target.value)
            }
            disabled={imagesLoading || resultLoading}
          >
            <option value="">Resim Seçiniz</option>
            {imagesLoading ? (
              <option>loading Images</option>
            ) : (
              images?.map((image) => (
                <option value={image.name}>{image.name}</option>
              ))
            )}
          </select>
        )}
      </div>
      <div>
        <button
          className="
          border-2 bg-sky-600 text-white rounded-xl px-3 py-2
          transition-all duration-150
          hover:scale-110
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:scale-100
        "
          onClick={() => uploadRef.current?.click()}
          disabled={resultLoading}
        >
          Upload
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={onFileChange}
          ref={uploadRef}
        />
      </div>
      <div>
        <button
          className="
    border-2 bg-sky-600 text-white rounded-xl px-3 py-2
    transition-all duration-150
    hover:scale-110
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
  "
          onClick={handlePredict}
          disabled={resultLoading}
        >
          {resultLoading ? "Loading..." : "Predict"}
        </button>
      </div>
    </form>
  );
};

export default ModelForm;
