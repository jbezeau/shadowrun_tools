import { expect, test } from "vitest";
import {render, screen } from "@testing-library/react";
import SkillInput from "./skill_input";
import { BaseSkills } from "../../skills";

// sanity checks
test("Skill Selector and Selection tests", () => {
    render(<SkillInput />); // select element with options for all skills
    // want to see one <select> element with role "skill_selector"
    expect(screen.findByRole("skill_selector")).toBeDefined();
    expect(screen.findByRole("skill_value")).toBeDefined();
    expect(screen.findByRole("skill_add")).toBeDefined();
    // want to see <option> elements with role "skill_selection" for each entry in BaseSkills
    expect(screen.getAllByRole("skill_selection")).toHaveLength(Object.keys(BaseSkills).length); 
});