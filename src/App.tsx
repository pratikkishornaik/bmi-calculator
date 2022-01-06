import BMIWidget from "./Component/BmiWidget";
import "./App.css";
import { useState, useRef, useEffect } from "react";

const initialState = {
  weight: { value: "", touched: false },
  height: { value: "", touched: false },
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState("");
  const [bmiScore, setBmiScore] = useState(null);
  const bmiWidget: any = useRef(null);
  const bmiForm: any = useRef(null);
  const {
    weight: { value: weightValue },
    height: { value: heightValue },
  } = formData;

  useEffect(() => {
    const { weight, height } = formData;
    if (weight.touched || height.touched) {
      validateForm();
    }
  }, [formData]);

  const calculateBMI = () => {
    if (+weightValue > 0 && +heightValue > 0) {
      const result: any = Math.round(
        (+weightValue / Math.pow(+heightValue, 2)) * 10000
      );
      setBmiScore(result);
    }
  };

  const inputChange = (e: any) => {
    const element = e.target;

    setFormData({
      ...formData,
      [element.name]: { value: element.value, touched: true },
    });
  };

  const validateForm = () => {
    const { weight, height } = formData;
    const acceptNumbers = new RegExp(/^[0-9]*$/);

    if (!height.touched && !weight.touched) {
      setFormError("Enter values");
      return false;
    }
    if (!height.touched || !weight.touched) {
      return false;
    }

    if (
      !height.value ||
      !weight.value ||
      +weight.value > 500 ||
      +height.value > 250 ||
      !acceptNumbers.test(height.value) ||
      !acceptNumbers.test(weight.value)
    ) {
      setFormError("Invalid field values");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    calculateBMI();
    bmiWidget.current.scrollIntoView && bmiWidget.current.scrollIntoView();
  };

  const recalculateBmi = () => {
    bmiForm?.current?.scrollIntoView();
    setFormData(initialState);
    setFormError("");
    setBmiScore(null);
  };

  return (
    <div className="App">
      <div className="containers" ref={bmiForm}>
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="heading">Human Body Mass Calculator</h2>
          <h4 className="sub-heading">Calculate Your Body Mass Index</h4>
          <input
            type="text"
            placeholder="Weight (kgs)"
            name="weight"
            onChange={inputChange}
            value={formData.weight.value}
            autoComplete="off"
            className="form-input"
            data-testid="weightInput"
          />

          <input
            type="text"
            placeholder="Height (cms)"
            name="height"
            onChange={inputChange}
            value={formData.height.value}
            autoComplete="off"
            className="form-input"
            data-testid="heightInput"
          />
          {formError && (
            <div className="error" data-testid="formError">
              Please enter valid inputs
            </div>
          )}
          <button className="button" type="submit" data-testid="calcButton">
            Calculate BMI
          </button>
        </form>
      </div>
      <div className="containers" ref={bmiWidget}>
        <BMIWidget score={bmiScore} />
        <button
          type="button"
          onClick={recalculateBmi}
          data-testid="recalcButton"
          className="button"
        >
          Re-Calculate BMI
        </button>
      </div>
    </div>
  );
}

export default App;
