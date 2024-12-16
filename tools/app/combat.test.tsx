import { test, expect } from "vitest";
import { CharInfo } from "./mechanics";
import { Predator, Vest } from "./equipment";
import { SingleAttack, InitiativeRoll, InitiativeStart, InitiativeChar, 
    InitiativeUpdate, InitiativeNum } from "./combat";

const testFirearms = {skill:["firearms"], skillLvl:[5]};

const joe:CharInfo = {
    name:"Joe Test",
    stats:[{level:[3]}, {level:[3]}, {level:[3]}, // plysical (body, quickness, strength)
           {level:[3]}, {level:[3]}, {level:[3]}, // mental (charisma, intelligence, willpower)
           {level:[0]}, {level:[6]},              // magic (magic, essence)
           {level:[10]}, {level:[1]}],             // initiative (reaction, dice)
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
    expect(SingleAttack(joe, jay), "Predator (skill 5) vs Vest").toStrictEqual(jay);
    expect(SingleAttack(jay, joe), "Fists (unskilled, QUI 2) vs unarmored").toStrictEqual(joe);
});

// test initiative rules
test("initiative", () => {
    // test initiatives are in the range 4..9
    expect(InitiativeRoll(joe), "Joe's initiative").toBeGreaterThanOrEqual(11);
    expect(InitiativeRoll(jay), "Jay's initiative").toBeLessThanOrEqual(9);

    // we rigged Joe's reaction score so we can be sure he goes first
    var tracker:Map<number, CharInfo> = InitiativeStart([joe, jay]);
    console.log(tracker);
    console.log(InitiativeNum(tracker));
    expect(InitiativeChar(tracker), "Joe wins").toStrictEqual(joe);

    // now we don't know who goes next but we can be sure both characters still have actions
    tracker = InitiativeUpdate(tracker);
    expect(tracker.size, "Still 2 characters left to act after Joe's first").toBe(2);

    // now we know there's only one character left to act
    tracker = InitiativeUpdate(tracker);
    expect(tracker.size, "Just 1 character left in order").toBe(1);

    // and let's check the empty map
    tracker = InitiativeUpdate(tracker);
    expect(tracker.size, "Empty").toBe(0);
});