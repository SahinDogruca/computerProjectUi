import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useModels } from "../hooks/useModels";
import { useUploadModel } from "../hooks/useUploadModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type ModelFormProbs = {
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
};

const ModelForm = ({ selectedModel, setSelectedModel }: ModelFormProbs) => {
  const {
    models,
    loading: modelsLoading,
    error: modelsError,
    loadModels,
  } = useModels();
  const {
    loading: uploadModelLoading,
    error: uploadModelError,
    uploadModel,
  } = useUploadModel();

  const modelRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState("Model Name");
  const [uploadedModelName, setUploadedModelName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleModelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedModelName === "") {
      setError("Enter Model Name!!!");
      return;
    }

    try {
      await uploadModel(file, uploadedModelName);
      await loadModels();
      setSelectedModel(uploadedModelName);
      setError(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }

    e.target.value = "";
    setUploadedModelName("");
  };
  return (
    <div className="flex flex-row flex-wrap gap-3 items-center">
      <Select
        disabled={modelsLoading || uploadModelLoading}
        value={selectedModel}
        onValueChange={setSelectedModel}
      >
        <SelectTrigger className="w-fit min-w-51.25 disabled:opacity-50 disabled:cursor-not-allowed">
          <SelectValue
            placeholder={
              modelsLoading || uploadModelLoading ? "Loading..." : "Models"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {models?.map((model) => (
            <SelectItem value={model} key={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="w-fit"
        type="text"
        placeholder={placeholder}
        onFocus={() => setPlaceholder("yolov11l-seg")}
        onBlur={() => setPlaceholder("Model Name")}
        value={uploadedModelName}
        onChange={(e) => setUploadedModelName(e.target.value)}
      />

      <Button variant="outline" onClick={() => modelRef.current?.click()}>
        Upload Model
      </Button>
      <input
        type="file"
        className="hidden"
        ref={modelRef}
        onChange={handleModelChange}
      />

      {modelsError && (
        <div className="text-red-400 text-sm ml-3">{modelsError}</div>
      )}

      {uploadModelError && (
        <div className="text-red-400 text-sm ml-3">{uploadModelError}</div>
      )}

      {error && <div className="text-red-400 text-sm ml-3">{error}</div>}
    </div>
  );
};

export default ModelForm;
