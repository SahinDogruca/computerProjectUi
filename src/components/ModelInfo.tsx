import type { ModelInfoType } from "../types";
import { format3 } from "../utils";

const ModelInfo = ({ model_info }: { model_info: ModelInfoType }) => {
  return (
    <section
      id="model-info"
      className="grid grid-cols-3 grid-rows-2 gap-4 text-start"
    >
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3 className="font-medium">Model Name</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{model_info?.model_name}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3>Parameters</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{model_info.parameters}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3 className="font-medium">GFlops</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{format3(model_info.gflops)}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3 className="font-medium">Image Size</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{model_info.imgsz}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3 className="font-medium">layers</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{model_info.layers}</div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 flex flex-row justify-between">
          <h3 className="font-medium">Task</h3>
          <span>:</span>
        </div>
        <div className="w-1/2 ">{model_info.task}</div>
      </div>
    </section>
  );
};

export default ModelInfo;
