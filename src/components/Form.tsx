import { Button } from "./ui/button";
import SelectImage from "./SelectImage";
import type { UsePredictReturn } from "../hooks/usePredict";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import ModelForm from "./ModelForm";

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
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedLabel, setUploadedLabel] = useState<File | null>(null);
  const [confScore, setConfScore] = useState(0.5);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");

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
        <ModelForm
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
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
          <Label htmlFor="confidence_score">Confidence Score :</Label>
          <Input
            id="confidence_score"
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
