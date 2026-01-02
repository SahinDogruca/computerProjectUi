import type { ModelDetailResponse } from "../types";
import ModelGraphics from "./ModelGraphics";
import ModelInfo from "./ModelInfo";
import ModelMetrics from "./ModelMetrics";

const ModelCart = ({
  modelDetail,
}: {
  modelDetail: ModelDetailResponse | null;
}) => {
  return (
    <>
      {modelDetail && (
        <div className="px-5 py-2">
          <h2 className="text-3xl mt-5">
            {modelDetail?.model_info.model_name.toLocaleUpperCase()}
          </h2>

          <div className="h-px w-full bg-slate-300 my-5"></div>

          {/* model info */}
          <h3 className="text-2xl text-center mb-2">Model Info</h3>
          <ModelInfo model_info={modelDetail.model_info} />

          <div className="h-px w-full bg-slate-200 my-4"></div>

          {/* metrics */}
          <h3 className="text-2xl text-center">Model Test Metrics</h3>
          <ModelMetrics model_metrics={modelDetail.metrics} />

          <div className="h-px w-full bg-slate-200 my-4"></div>

          {/* Graphics */}
          <ModelGraphics model_graphics={modelDetail.graphics} />
        </div>
      )}
    </>
  );
};

export default ModelCart;
