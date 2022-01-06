import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("BMI calc empty submit input errors", () => {
  render(<App />);
  const button = screen.getByTestId("calcButton");
  fireEvent(button, new MouseEvent("click", {}));
  const formErrorFound = screen.getByTestId("formError");
  expect(formErrorFound).toBeInTheDocument();
});

test("BMI invalid inputs", () => {
  render(<App />);

  const height = screen.getByTestId("heightInput");
  const weight = screen.getByTestId("weightInput");

  fireEvent.change(height, { target: { value: "251" } });
  fireEvent.change(weight, { target: { value: "501" } });

  const button = screen.getByTestId("calcButton");
  fireEvent(button, new MouseEvent("click", {}));

  const error = screen.getByTestId("formError");
  expect(error).toBeInTheDocument();
});

test("BMI score validation", () => {
  render(<App />);

  const height = screen.getByTestId("heightInput");
  const weight = screen.getByTestId("weightInput");
  const testInputs = [
    { height: 170, weight: 50, result: 17 },
    { height: 170, weight: 80, result: 28 },
    { height: 160, weight: 80, result: 31 },
    { height: 160, weight: 60, result: 23 },
  ];
  const bmiScore = screen.getByTestId("bmiScore");
  const button = screen.getByTestId("calcButton");

  for (let testData of testInputs) {
    fireEvent.change(height, { target: { value: testData.height } });
    fireEvent.change(weight, { target: { value: testData.weight } });
    fireEvent(button, new MouseEvent("click", {}));
    expect(bmiScore.innerHTML).toContain("" + testData.result);
  }
});

test("BMI result validation", () => {
  render(<App />);

  const height = screen.getByTestId("heightInput");
  const weight = screen.getByTestId("weightInput");
  const testInputs = [
    { height: 170, weight: 50, result: "UNDERWEIGHT" },
    { height: 170, weight: 80, result: "OVERWEIGHT" },
    { height: 160, weight: 80, result: "OBESE" },
    { height: 160, weight: 60, result: "HEALTHY" },
  ];
  const bmiResult = screen.getByTestId("bmiResult");
  const button = screen.getByTestId("calcButton");

  for (let testData of testInputs) {
    fireEvent.change(height, { target: { value: testData.height } });
    fireEvent.change(weight, { target: { value: testData.weight } });
    fireEvent(button, new MouseEvent("click", {}));
    expect(bmiResult.innerHTML).toContain("" + testData.result);
  }
});

test("BMI invalid followed by valid inputs", () => {
  render(<App />);

  const height = screen.getByTestId("heightInput");
  const weight = screen.getByTestId("weightInput");

  fireEvent.change(height, { target: { value: "251" } });
  fireEvent.change(weight, { target: { value: "501" } });

  const button = screen.getByTestId("calcButton");
  fireEvent(button, new MouseEvent("click", {}));

  const error = screen.getByTestId("formError");
  expect(error).toBeInTheDocument();

  fireEvent.change(height, { target: { value: "160" } });
  fireEvent.change(weight, { target: { value: "80" } });

  fireEvent(button, new MouseEvent("click", {}));
  expect(error).not.toBeInTheDocument();

  const bmiScore = screen.getByTestId("bmiScore");
  expect(bmiScore.innerHTML).toContain("31");
});
