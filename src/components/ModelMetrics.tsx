import type { Metrics } from "../types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ModelMetrics = ({ model_metrics }: { model_metrics: Metrics }) => {
  console.log(model_metrics.summary.box);

  return (
    <Table>
      <TableCaption>
        Model Metrics S (Segmentation metrics) B (Box metrics)
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25 font-bold">Class</TableHead>
          <TableHead>B Precision</TableHead>
          <TableHead>B Recall</TableHead>
          <TableHead>B mAP50</TableHead>
          <TableHead>B mAP50-95</TableHead>
          <TableHead>S Precision</TableHead>
          <TableHead>S Recall</TableHead>
          <TableHead>S mAP50</TableHead>
          <TableHead>S mAP50-95</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>All</TableCell>
          <TableCell>{model_metrics.summary.box.precision}</TableCell>
          <TableCell>{model_metrics.summary.box.recall}</TableCell>
          <TableCell>{model_metrics.summary.box.mAP50}</TableCell>
          <TableCell>{model_metrics.summary.box.mAP50_95}</TableCell>
          <TableCell>{model_metrics.summary.mask.precision}</TableCell>
          <TableCell>{model_metrics.summary.mask.recall}</TableCell>
          <TableCell>{model_metrics.summary.mask.mAP50}</TableCell>
          <TableCell>{model_metrics.summary.mask.mAP50_95}</TableCell>
        </TableRow>
        {model_metrics.classes.map((class_metrics) => (
          <TableRow>
            <TableCell>{class_metrics.class_name}</TableCell>
            <TableCell>{class_metrics.box.precision}</TableCell>
            <TableCell>{class_metrics.box.recall}</TableCell>
            <TableCell>{class_metrics.box.mAP50}</TableCell>
            <TableCell>{class_metrics.box.mAP50_95}</TableCell>
            <TableCell>{class_metrics.mask.precision}</TableCell>
            <TableCell>{class_metrics.mask.recall}</TableCell>
            <TableCell>{class_metrics.mask.mAP50}</TableCell>
            <TableCell>{class_metrics.mask.mAP50_95}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8} className="text-left">
            Fitness
          </TableCell>
          <TableCell>{model_metrics.summary.fitness}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ModelMetrics;
