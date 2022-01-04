import BMIWidget from "./Component/BmiWidget";
import "./App.css";
import { useState, useRef } from "react";

const initialState = {
  weight: "",
  height: "",
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(false);
  const [bmiScore, setBmiScore] = useState(null);
  const bmiWidget: any = useRef(null);
  const bmiForm: any = useRef(null);

  const calculateBMI = () => {
    const { weight, height } = formData;
    if (+weight > 0 && +height > 0) {
      const result: any = Math.round((+weight / Math.pow(+height, 2)) * 10000);
      setBmiScore(result);
    }
  };

  const inputChange = (e: any) => {
    const element = e.target;
    setFormData({ ...formData, [element.name]: +element.value });
  };

  const validateForm = () => {
    const { weight, height } = formData;

    if ((!height && !weight) || +weight > 500 || +height > 250) {
      setFormError(true);
      return false;
    }
    setFormError(false);
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    calculateBMI();
    bmiWidget.current.scrollIntoView();
  };

  const recalculateBmi = () => {
    bmiForm.current.scrollIntoView();
    setFormData(initialState);
    setBmiScore(null);
  };

  return (
    <div className="App">
      <div className="containers" ref={bmiForm}>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Human Body Mass Calculator</h2>
          <h4>Calculate Your Body Mass Index</h4>
          <input
            type="number"
            placeholder="Weight (kgs)"
            name="weight"
            onChange={inputChange}
            value={formData.weight}
            autoComplete="off"
          />

          <input
            type="number"
            placeholder="Height (cms)"
            name="height"
            onChange={inputChange}
            value={formData.height}
            autoComplete="off"
          />
          {formError && <div className="error">Please enter valid inputs</div>}
          <button type="submit"> Calculate BMI</button>
        </form>
      </div>
      <div className="containers" ref={bmiWidget}>
        <BMIWidget score={bmiScore} />
        <button type="button" onClick={recalculateBmi}>
          Re-Calculate BMI
        </button>
      </div>
    </div>
  );
}

export default App;
