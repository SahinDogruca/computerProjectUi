import { useModelDetail } from "../hooks/useModelDetail";
import ModelCart from "./ModelCart";

const ModelCartContainer = ({ modelName }: { modelName: string }) => {
  const { modelDetail, loading, error } = useModelDetail(modelName);

  console.log(modelDetail);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>error loading {modelName}</div>;
  return <ModelCart modelDetail={modelDetail} />;
};

export default ModelCartContainer;
