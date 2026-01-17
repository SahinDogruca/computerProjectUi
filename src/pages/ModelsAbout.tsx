import ModelCartContainer from "../components/ModelCartContainer";

const modelNames = [
  "yolov8x-seg-pretrained",
  "yolov8x-seg",
  "yolov12l-seg-pretrained",
  "yolov12l-seg",
  "rt-detrv4x-pretrained",
  "rt-detrv4x",
];

const ModelsAbout = () => {
  return (
    <div className="w-5/6 bg-slate-50 mx-auto my-3 rounded shadow p-5 text-center">
      <div className="w-7/8 bg-slate-200 p-3 rounded-xl shadow mx-auto mb-3">
        <h1 className="text-5xl text-shadow font-medium ">Models Info</h1>
      </div>

      {modelNames.map((name) => (
        <div className="bg-slate-100 w-7/8 mx-auto shadow rounded my-5">
          <ModelCartContainer key={name} modelName={name} />
        </div>
      ))}
    </div>
  );
};

export default ModelsAbout;
