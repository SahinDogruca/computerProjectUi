import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import SelectImage from "./SelectImage";
import { useModels } from "../hooks/useModels";
import FormError from "./FormError";
import type { UsePredictReturn } from "../hooks/usePredict";
import { useState } from "react";
import { Input } from "./ui/input";

interface FormProps {
  fetchPredictTest: UsePredictReturn["fetchPredictTest"];
  fetchUploadTest: UsePredictReturn["fetchUploadTest"];
  resultsError: UsePredictReturn["error"];
}

const Form = ({
  fetchPredictTest,
  fetchUploadTest,
  resultsError,
}: FormProps) => {
  const { models, loading: modelsLoading, error: modelsError } = useModels();

  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedLabel, setUploadedLabel] = useState<File | null>(null);
  const [confScore, setConfScore] = useState(0.5);
  const [formError, setFormError] = useState<string | null>(null);

  const handlePredict = () => {
    if (selectedModel !== "") {
      if (selectedImage !== "" && uploadedFile === null) {
        fetchPredictTest(selectedModel, selectedImage, confScore);
        setFormError(null);
      } else if (selectedImage === "" && uploadedFile) {
        if (uploadedLabel) {
          fetchUploadTest(
            uploadedFile,
            selectedModel,
            confScore,
            0.001,
            uploadedLabel,
          );
        } else {
          fetchUploadTest(uploadedFile, selectedModel, confScore, 0.001);
        }
        setFormError(null);
      } else {
        setFormError("Please Select or Upload an Image!");
      }
    } else {
      setFormError("Please Select a Model!");
    }
  };

  return (
    <div className="bg-slate-100 rounded-xl p-5 pb-3 mb-5">
      <div className="flex flex-col flex-wrap gap-2 justify-center">
        <div className="flex flex-row flex-wrap gap-3 items-center">
          <Select
            disabled={modelsLoading}
            value={selectedModel}
            onValueChange={setSelectedModel}
          >
            <SelectTrigger className="w-fit min-w-51.25 disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue
                placeholder={modelsLoading ? "Loading..." : "Models"}
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
          <Button variant="outline">Upload Model</Button>

          {modelsError && (
            <div className="text-red-400 text-sm ml-3">{modelsError}</div>
          )}
        </div>

        <div>
          <SelectImage
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            uploadedLabel={uploadedLabel}
            setUploadedLabel={setUploadedLabel}
          />
        </div>

        <div className="flex flex-row gap-3">
          <Input
            className="max-w-40"
            type="number"
            placeholder="Confidence Score"
            value={confScore}
            onChange={(e) => setConfScore(Number(e.target.value))}
            min={0}
            max={1}
            step={0.05}
          ></Input>
          <Button onClick={handlePredict}>Predict</Button>
        </div>
      </div>

      {(formError || resultsError) && (
        <div className="w-full h-px bg-slate-300 mt-2"></div>
      )}

      <div className="p-1 text-center">
        {formError ? (
          <div className="text-red-400 text-sm">{formError}</div>
        ) : (
          <>
            {resultsError && (
              <div className="text-red-400 text-sm">{resultsError}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
