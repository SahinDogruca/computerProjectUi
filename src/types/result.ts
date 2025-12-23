export type ImageType = "ground_truth" | "prediction" | "overlay"

export type OverallMetrics = {
    precision: number;
    recall: number;
    f1_score: number;
    total_tp: number;
    total_fp: number;
    total_fn: number;
};

export type ClassMetric = {
    class_id: number;
    class_name: string;
    precision: number;
    recall: number;
    f1_score: number;
    tp: number;
    fp: number;
    fn: number;
    avg_iou: number;
};

export type MetricsResponse = {
    result_id: string;
    model_name: string;
    overall_metrics: OverallMetrics;
    class_metrics: ClassMetric[];
    inference_info: {
        inference_time: number;
        conf_threshold: number;
        iou_threshold: number;
    };
};
