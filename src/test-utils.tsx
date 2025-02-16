import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@store/storeConfig";

// Custom render function that wraps components with Redux Provider
const customRender = (ui: React.ReactElement, options = {}) =>
  render(<Provider store={store}>{ui}</Provider>, options);

export * from "@testing-library/react"; // Re-export everything
export { customRender as render, store }; // Override default render
