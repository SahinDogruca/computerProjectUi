import { type FC } from "react";
import { useResult } from "../hooks/useResult";
import { useSearchParams } from "react-router";

const Metrics = () => {
  const [searchParams] = useSearchParams();
  const resultId = searchParams.get("result_id");
  const { data, loading, error } = useResult(resultId);

  if (!resultId) {
    return (
      <div className="text-gray-500 text-center">Henüz bir sonuç seçilmedi</div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center font-medium">{error}</div>;
  }

  if (!data) return null;

  const { overall_metrics, class_metrics, inference_info, model_name } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold text-sky-700">
          Model: {model_name}
        </h2>
        <p className="text-sm text-gray-500">Result ID: {data.result_id}</p>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Precision" value={overall_metrics.precision} />
        <MetricCard label="Recall" value={overall_metrics.recall} />
        <MetricCard label="F1 Score" value={overall_metrics.f1_score} />
      </div>

      {/* TP / FP / FN */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="TP" value={overall_metrics.total_tp} color="green" />
        <MetricCard label="FP" value={overall_metrics.total_fp} color="red" />
        <MetricCard
          label="FN"
          value={overall_metrics.total_fn}
          color="yellow"
        />
      </div>

      {/* Class Metrics */}
      <div className="border rounded-xl p-4 bg-white shadow-sm">
        <h3 className="font-semibold mb-3">Class Metrics</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-50">
              <tr>
                <th className="px-3 py-2 text-left">Class</th>
                <th className="px-3 py-2">Precision</th>
                <th className="px-3 py-2">Recall</th>
                <th className="px-3 py-2">F1</th>
                <th className="px-3 py-2">IoU</th>
                <th className="px-3 py-2">TP</th>
                <th className="px-3 py-2">FP</th>
                <th className="px-3 py-2">FN</th>
              </tr>
            </thead>
            <tbody>
              {class_metrics.map((cls) => (
                <tr key={cls.class_id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium">{cls.class_name}</td>
                  <td className="px-3 py-2 text-center">
                    {cls.precision.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {cls.recall.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {cls.f1_score.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {cls.avg_iou.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-center text-green-600">
                    {cls.tp}
                  </td>
                  <td className="px-3 py-2 text-center text-red-600">
                    {cls.fp}
                  </td>
                  <td className="px-3 py-2 text-center text-yellow-600">
                    {cls.fn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inference Info */}
      <div className="border rounded-xl p-4 bg-gray-50 text-sm">
        <h3 className="font-semibold mb-2">Inference Info</h3>
        <p>Inference Time: {inference_info.inference_time.toFixed(2)} s</p>
        <p>Confidence Threshold: {inference_info.conf_threshold}</p>
        <p>IoU Threshold: {inference_info.iou_threshold}</p>
      </div>
    </div>
  );
};

type MetricCardProps = {
  label: string;
  value: number;
  color?: "green" | "red" | "yellow";
};

const MetricCard: FC<MetricCardProps> = ({ label, value, color = "sky" }) => {
  const colorMap = {
    sky: "text-sky-600",
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>
        {typeof value === "number" ? value.toFixed(2) : value}
      </p>
    </div>
  );
};

export default Metrics;
