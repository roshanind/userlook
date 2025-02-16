import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("renders the welcome message", () => {
  render(<App />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});
