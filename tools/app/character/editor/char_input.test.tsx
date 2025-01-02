import { expect, test } from "vitest";
import {render, screen } from "@testing-library/react";
import CharInput from "./char_input";

// sanity checks
test("Character Editor tests", () => {
    render(<CharInput />);
    expect(screen.getByText ("Character Entry")).toBeDefined();
    expect(screen.getAllByRole("textbox")).toHaveLength(1); //name
    expect(screen.getAllByRole("attribute")).toHaveLength(10); //stat inputs
});