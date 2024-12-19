import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test("App Router: Works with Server Components", () => {
  render(<Page />);
  expect( screen.getByRole ("heading", { level: 1, name: "App Router" })).toBeDefined();
  expect (screen.getByText ("Rolled")).toBeDefined();
  // only 2 elements with exactly Trish Panda
  expect (screen.getAllByText ("Trish Panda")).toHaveLength(2); 
  expect (screen.getByText ("Active Characters")).toBeDefined();
  expect (screen.getByText ("Initiative Order")).toBeDefined();
  expect (screen.getByText("Attack")).toBeDefined();
});
