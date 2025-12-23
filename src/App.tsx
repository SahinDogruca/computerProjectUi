import Metrics from "./components/Metrics";
import ModelForm from "./components/ModelForm";
import PredictGallery from "./components/PredictGallery";

const App = () => {
  return (
    <div className="w-1/2 mx-auto m-10 flex flex-col min-h-150">
      <div className="flex justify-center mb-10 shrink-0">
        <ModelForm />
      </div>

      <div className="flex-1 min-h-50 text-center">
        <PredictGallery />
        <Metrics />
      </div>
    </div>
  );
};

export default App;
