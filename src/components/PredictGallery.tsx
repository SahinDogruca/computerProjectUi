import { useState } from "react";
import { useSearchParams } from "react-router";
import { type ImageType } from "../types/result";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PredictGallery = () => {
  const [searchParams] = useSearchParams();
  const [imageType, setImageType] = useState<ImageType>("ground_truth");

  const result_id = searchParams.get("result_id");

  return (
    <>
      {result_id ? (
        <div className="flex flex-col">
          <div className="flex-1 text-center">
            <img src={`${BASE_URL}/visualization/${result_id}/${imageType}`} />
            <span className="my-3 inline-block">{imageType}</span>
          </div>
          <div className="w-7/8  mx-auto flex justify-between shrink-0 text-center">
            <div
              className="flex-1 bg-amber-50 hover:opacity-80 transition-opacity duration-100"
              onClick={() => setImageType("ground_truth")}
            >
              <img
                src={`${BASE_URL}/visualization/${result_id}/ground_truth`}
              />
              <span>ground truth</span>
            </div>
            <div
              className="flex-1 bg-amber-50 hover:opacity-80 transition-opacity duration-100"
              onClick={() => setImageType("overlay")}
            >
              <img src={`${BASE_URL}/visualization/${result_id}/overlay`} />
              <span>overlay</span>
            </div>
            <div
              className="flex-1 bg-amber-50 hover:opacity-80 transition-opacity duration-100"
              onClick={() => setImageType("prediction")}
            >
              <img src={`${BASE_URL}/visualization/${result_id}/prediction`} />
              <span>prediction</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Upload Image or predict within test set</div>
      )}
    </>
  );
};

export default PredictGallery;
