import { test, expect } from "vitest";
import { CharInfo } from "./mechanics";
import { Predator, Vest } from "./equipment";
import { Attack, InitiativeRoll } from "./combat";

const testFirearms = {skill:["firearms"], skillLvl:[5]};

const joe:CharInfo = {
    name:"Joe Test",
    stats:[{level:[3]}, {level:[3]}, {level:[3]}, // plysical (body, quickness, strength)
           {level:[3]}, {level:[3]}, {level:[3]}, // mental (charisma, intelligence, willpower)
           {level:[0]}, {level:[6]},              // magic (magic, essence)
           {level:[3]}, {level:[1]}],             // initiative (reaction, dice)
    skills:[testFirearms],
    equipped:Predator,
}

const jay:CharInfo = {
    name:"Jay Test",
    stats:[{level:[3]}, {level:[3]}, {level:[3]}, // plysical (body, quickness, strength)
           {level:[3]}, {level:[3]}, {level:[3]}, // mental (charisma, intelligence, willpower)
           {level:[0]}, {level:[6]},              // magic (magic, essence)
           {level:[3]}, {level:[1]}],             // initiative (reaction, dice)
    skills:[],
    worn:Vest,
}

// test combat rules
test("basic attack", () => {
    expect(Attack(joe, jay), "Predator (skill 5) vs Vest").toStrictEqual(jay);
    expect(Attack(jay, joe), "Fists (unskilled, QUI 2) vs unarmored").toStrictEqual(joe);
});

// test initiative rules
test("initiative", () => {
    // test initiatives are in the range 4..9
    expect(InitiativeRoll(joe), "Joe's initiative").toBeGreaterThanOrEqual(4);
    expect(InitiativeRoll(jay), "Jay's initiative").toBeLessThanOrEqual(9);
});