import { useState } from "react";
import type { UsePredictReturn } from "../hooks/usePredict";

interface PredictResultsProbs {
  results: UsePredictReturn["results"];
  resultsLoading: UsePredictReturn["loading"];
}

type ImageKey = "pred_image" | "gt_image" | "overlay_image";

const PredictResults = ({ results, resultsLoading }: PredictResultsProbs) => {
  const [activeImage, setActiveImage] = useState<ImageKey>("pred_image");

  const images: { key: ImageKey; label: string }[] = [
    { key: "pred_image", label: "Prediction" },
    { key: "gt_image", label: "Ground Truth" },
    { key: "overlay_image", label: "Overlay" },
  ];

  return (
    <div className="bg-slate-100 rounded-xl p-5 w-full">
      <div className="relative w-full overflow-hidden rounded-lg border mb-3">
        <div className="w-full h-120 flex items-center justify-center">
          {resultsLoading && (
            <div className="w-full h-120 animate-pulse bg-slate-300 rounded-lg" />
          )}

          {!resultsLoading && results === null && (
            <span className="text-gray-600">Predict an image</span>
          )}

          {!resultsLoading && results && (
            <img
              src={`data:image/png;base64,${results[activeImage]}`}
              className="object-contain"
            ></img>
          )}
        </div>
      </div>
      {results && (
        <div className="grid grid-cols-3 gap-3">
          {images.map(({ key, label }) => (
            <>
              {resultsLoading ? (
                <div className="animate-pulse h-40 w-full bg-slate-300 rounded-lg"></div>
              ) : (
                <button
                  key={key}
                  onClick={() => setActiveImage(key)}
                  className={`relative rounded-lg overflow-hidden border transition
              ${
                activeImage === key
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-1 hover:ring-gray-300"
              }`}
                >
                  {results[key] === undefined ? (
                    <div className="h-40 w-full flex items-center justify-center">
                      <span className="text-slate-500">
                        labels not found or wrong
                      </span>
                    </div>
                  ) : (
                    <img
                      src={`data:image/png;base64,${results[key]}`}
                      alt={label}
                      className="h-40 w-full object-cover"
                    />
                  )}

                  <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 text-center">
                    {label}
                  </span>
                </button>
              )}
            </>
          ))}
        </div>
      )}

      <div className="w-full h-px bg-slate-400 my-3"></div>

      <div className="mt-5">
        {results && (
          <>
            {resultsLoading ? (
              <div className="h-40 w-full animate-pulse bg-slate-300"></div>
            ) : (
              <div className="w-3/4 bg-slate-100 mx-auto text-center p-2 rounded-xl shadow">
                <h2>Confidence Chart</h2>
                <img
                  src={`data:image/png;base64,${results.confidence_chart}`}
                  alt="Confidence Chart"
                  className="w-full mt-2 object-contain h-auto"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PredictResults;
