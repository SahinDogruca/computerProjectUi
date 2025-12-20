import ModelForm from "./components/ModelForm"
import PredictGallery from "./components/PredictGallery"
import { useState } from 'react'

const App = () => {
  const [model, setModel] = useState([])

  

  return (
    <div>
      <div>
        <ModelForm />
      </div>

      <div>
        <PredictGallery />
      </div>
      
    </div>
  )
}

export default App
