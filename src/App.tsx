import Form from "./components/Form";
import PredictResults from "./components/PredictResults";
import { usePredict } from "./hooks/usePredict";
const App = () => {
  const {
    results,
    loading: resultsLoading,
    error: resultsError,
    fetchPredictTest,
    fetchUploadTest,
  } = usePredict();

  return (
    <div className="w-5/6 bg-slate-50 mx-auto my-3 shadow rounded p-5">
      <h1 className="text-center p-3 bg-slate-200 rounded-xl my-3 font-bold text-3xl shadow">
        Diagnosis of Lesions in Panoramic Radiographs
      </h1>
      <Form
        fetchPredictTest={fetchPredictTest}
        fetchUploadTest={fetchUploadTest}
        resultsError={resultsError}
      />
      <PredictResults
        key={results ? results.pred_image : "empty"}
        results={results}
        resultsLoading={resultsLoading}
      />
    </div>
  );
};

export default App;
