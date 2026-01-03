export interface Prediction {
  class: string;
  confidence: number;
}

export interface InferenceResponse {
  gt_image?: string;
  pred_image: string;
  overlay_image?: string;
  confidence_chart: string;
  inference_time: number;
  predictions: Prediction[];
  gt_warning?: string;
}

export type DetectionMetricString = {
  precision: string;
  recall: string;
  mAP50: string;
  mAP50_95: string;
};

export type DetectionMetric = {
  precision: number;
  recall: number;
  mAP50: number;
  mAP50_95: number;
};

export type ClassMetric = {
  class_id: number;
  class_name: string;
  box: DetectionMetricString;
  mask: DetectionMetricString;
};

export type MetricsSummary = {
  box: DetectionMetricString;
  mask: DetectionMetricString;
  fitness: string;
};

export type Metrics = {
  summary: MetricsSummary;
  classes: ClassMetric[];
};

export type ModelInfoType = {
  model_name: string;
  task: "detect" | "segment" | "classify";
  imgsz: number;
  layers: number;
  parameters: number;
  gflops: number;
};

export type GraphicItem = {
  label: string;
  path: string;
};

export type ModelDetailResponse = {
  model: string;
  model_info: ModelInfoType;
  metrics: Metrics;
  graphics: GraphicItem[];
};

export type UploadModelResponse = {
  message: string;
  filename: string;
};
