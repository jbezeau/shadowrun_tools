import { expect, test } from "vitest";
import {render, screen } from "@testing-library/react";
import StatInput from "./stat_input";

// sanity checks
test("Stat Field Editor tests", () => {
    render(<StatInput name="CHA"/>); // rizz check
    expect(screen.findByLabelText("CHA ")).toBeDefined();
    expect(screen.getAllByRole("attribute")).toHaveLength(1); //stat inputs
});