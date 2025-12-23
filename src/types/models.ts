export type ModelType = "yolo_seg" | "rt_detr";
export type ModelFormat = "yolo" | "coco";

export interface ModelInfo {
    name: string;
    type: ModelType;
    format: ModelFormat;
    loaded: boolean;
}