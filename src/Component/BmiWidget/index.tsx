import React, { useEffect, useState } from "react";
import "./bmi.css";

interface IScore {
  max: number;
  min: number;
}

const BMIWidget = (props: any) => {
  const { score } = props;
  const [bmiResult, setBmiResult] = useState("");
  const [rotateDeg, setRotateDeg] = useState(5);

  const DEGREE_CLASSIFICATION: any = {
    UNDERWEIGHT: 32,
    HEALTHY: 95,
    OVERWEIGHT: 145,
    OBESE: 173,
  };

  const BMI_CLASSIFICATION: any = {
    UNDERWEIGHT: { max: 18, min: 0 },
    HEALTHY: { max: 24, min: 19 },
    OVERWEIGHT: { max: 29, min: 25 },
    OBESE: { max: 150, min: 30 },
  };

  useEffect(() => {
    if (score) {
      calculateBmiRange();
    } else {
      setBmiResult("");
      setRotateDeg(5);
    }
  }, [props.score]);

  const calculateBmiRange = () => {
    const bmiResult: any = Object.keys(BMI_CLASSIFICATION).find(
      (key: any, index, arr) => {
        const classifier: IScore = BMI_CLASSIFICATION[key];
        if (score >= classifier.min && score <= classifier.max) {
          return true;
        }
        if (index === arr.length - 1) {
          if (score > classifier.max) {
            return true;
          }
        }
      }
    );
    setRotateDeg(DEGREE_CLASSIFICATION[bmiResult]);
    setBmiResult(bmiResult || "");
  };

  const renderGaugeSeperator = () => {
    const degrees = [329, 35, 63];
    return degrees.map((deg) => {
      return (
        <div
          key={deg + ""}
          className="gauge_seperator"
          style={{ transform: `rotate(${deg}deg)` }}
        ></div>
      );
    });
  };

  return (
    <div className="container">
      <div className="gauge_body">
        <div className="gauge_fill">
          {renderGaugeSeperator()}
          <div className="gauge_track">
            <div>
              <h2 data-testid="bmiScore">
                {!score ? "Enter your details" : score}
              </h2>
              <h4 data-testid="bmiResult">{bmiResult}</h4>
            </div>
          </div>
        </div>
      </div>
      <div
        className="tracker_container fill"
        style={{ transform: `rotate(${rotateDeg}deg)` }}
      >
        <div className="tracker "></div>
      </div>
    </div>
  );
};

export default BMIWidget;
