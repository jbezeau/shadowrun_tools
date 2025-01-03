import { expect, test } from "vitest";
import { CharAttr, Stat } from "./attributes";
import { CharSkill } from "./skills";
import { CharInfo, Check as SkillCheck, Roll, SkillRoll, Sum, SkillDice} from "./mechanics";

test("Rolling dice", () => {
  let outcome:number[] = Roll(3);
  
  // do I get the right number of outcomes
  expect (outcome.length, "Three die rolls").toBe(3);

  // are all outcomes in the range 1..6
  var rangeTest:boolean = true;
  outcome.map((o:number) => {
    if (1 > o || 6 < o) rangeTest = false;
  });
  expect (rangeTest, "Are all dice between 1-6").toBe(true);

  expect (Sum([4,1]), "Add dice like for initiative").toBe(5);
});

test("Skill Rolls", () => {
  const skillA:string[] = ["firearms","smg","hk227"];
  const testStats:CharAttr = {level:[3]};
  const testFirearms:CharSkill = {skill:skillA, skillLvl:[3,5,7]};
  const testElectronics:CharSkill = {skill:["electronics"], skillLvl:[4],};
  const testChar:CharInfo = {name:"Guy LeGuy", 
    stats:[testStats,testStats,testStats,testStats,testStats,testStats], 
    skills:[testFirearms, testElectronics]};
  expect (SkillDice(testChar, skillA, Stat.QUI), "H&K227 at 7 dice").toBe(7);
  expect (SkillRoll(testChar, skillA, Stat.QUI).length, "H&K227 at 7 dice").toBe(7);

  const skillB:string[] = ["firearms","smg","tmp"];
  expect (SkillRoll(testChar, skillB, Stat.QUI).length, "SandlerTMP at 5 dice").toBe(5);

  const skillC:string[] = ["firearms","pistol","predator"];
  expect (SkillRoll(testChar, skillC, Stat.QUI).length, "Ares Predator at 3 dice").toBe(3);

  const skillD:string[] = ["medicine","first-aid","kissing"];
  expect (SkillRoll(testChar, skillD, Stat.INT).length, "medicine at 2 on INT/2 ").toBe(2);

  const skillE:string[] = ["korean"];
  expect (SkillRoll(testChar, skillE, Stat.CHA).length, "korean at 2").toBe(2);

  const skillF:string[] = ["electronics"];
  expect (SkillRoll(testChar, ["electronics"], Stat.INT).length, "base Electronics").toBe(4);
});

test("Dice Checks", () => {
  const test:number[] = [6,5,4,3,2,1];
  let checkA:number = SkillCheck(test, 5, 1);
  expect (checkA, "hard roll").toBe(1);
  expect (SkillCheck([6,5,4,3,2,1], 3, 1), "easy roll").toBe(3);
  expect (SkillCheck([4,4,4,2,2], 4, 4), "attack roll").toBe(-1);
});