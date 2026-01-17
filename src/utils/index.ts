import type { DetectionMetricString, Metrics } from "../types";

export const format3 = (v: any): string => {
  const n = Number(v);
  if (isNaN(n)) return "0.000";
  return n.toFixed(3);
};

const normalizeMetric = (m: any): DetectionMetricString => ({
  precision: format3(m.precision),
  recall: format3(m.recall),
  mAP50: format3(m.mAP50),
  mAP50_95: format3(m["mAP50-95"]),
});

export const normalizeMetrics = (metrics: Metrics): Metrics => ({
  summary: {
    box: normalizeMetric(metrics.summary.box),
    ...(metrics.summary.mask && {
      mask: normalizeMetric(metrics.summary.mask),
    }),
    fitness: Number(metrics.summary.fitness).toFixed(3),
  },
  classes: metrics.classes.map((cls) => ({
    ...cls,
    box: normalizeMetric(cls.box),
    ...(cls.mask && {
      mask: normalizeMetric(cls.mask),
    }),
  })),
});

export const returnImage = (image_path: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${image_path}`;
};
