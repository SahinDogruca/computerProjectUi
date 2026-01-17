import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useImages } from "../hooks/useImages";

interface SelectImageProbs {
  selectedImage: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;
  uploadedFile: File | null;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
  uploadedLabel: File | null;
  setUploadedLabel: Dispatch<SetStateAction<File | null>>;
}

const SelectImage = ({
  selectedImage,
  setSelectedImage,
  uploadedFile,
  setUploadedFile,
  uploadedLabel,
  setUploadedLabel,
}: SelectImageProbs) => {
  const [mode, setMode] = useState<"upload" | "select">("select");
  const { images, loading: imagesLoading, error: imagesError } = useImages();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelInputRef = useRef<HTMLInputElement>(null);

  const handleModeChange = (checked: boolean) => {
    const newMode = checked ? "upload" : "select";
    setMode(newMode);

    if (newMode === "upload") {
      setSelectedImage("");
    }

    if (newMode === "select") {
      setUploadedFile(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadLabelClick = () => {
    labelInputRef.current?.click();
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedLabel(file);

    e.target.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    e.target.value = "";
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={selectedImage}
        onValueChange={setSelectedImage}
        disabled={mode !== "select" || imagesLoading}
      >
        <SelectTrigger className="w-fit min-w-75 disabled:opacity-50 disabled:cursor-not-allowed">
          <SelectValue placeholder="Test Image" />
        </SelectTrigger>
        <SelectContent>
          {images?.map((image) => (
            <SelectItem value={image} key={image}>
              {image}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Switch
        id="input"
        checked={mode === "upload"}
        onCheckedChange={handleModeChange}
      />

      <div className="flex flex-row items-start">
        <Button
          variant="outline"
          disabled={mode !== "upload"}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-30 overflow-x-hidden"
          onClick={handleUploadClick}
        >
          {uploadedFile ? uploadedFile.name : "Upload Image"}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              disabled={mode !== "upload"}
              className="disabled:opacity-50 disabled:cursor-not-allowed w-30 overflow-x-hidden"
              onClick={handleUploadLabelClick}
            >
              {uploadedLabel ? uploadedLabel.name : "Upload Label"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <ul>
              <li>
                File type: <code>.txt</code>
              </li>
              <li>Format: YOLO polygon (segmentation)</li>
              <li>Or YOLO (object detection)</li>
              <li>One object per line</li>
            </ul>
          </TooltipContent>
        </Tooltip>

        <input
          ref={labelInputRef}
          type="file"
          className="hidden"
          onChange={handleLabelChange}
          accept="txt/*,json/*"
        />
      </div>

      {imagesError && (
        <div className="text-red-400 text-sm overflow-x-clip ml-3">
          {imagesError}
        </div>
      )}
    </div>
  );
};

export default SelectImage;
