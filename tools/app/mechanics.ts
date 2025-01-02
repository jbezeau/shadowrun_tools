import { Weapon, Armor } from "./equipment";
import { AttrLvl, CharAttr, Stat } from "./attributes";
import { CharSkill, SkillTypes } from "./skills";

// Gameplay functions for shadowrun

// the character sheet interfaces are designed to make the JSON look concise
// rather than a lot of named fields I prefer to use arrays and then enum the array positions


// probably move this to a character sheet .ts at some point
export interface CharInfo {
  name:string,
  stats:CharAttr[],
  skills:CharSkill[],
  equipped?:Weapon,
  worn?:Armor,
}

// roll a number of d6
export function Roll(n: number):number[] {

  // declare an array in which to keep n results
  var rolls: number[] = new Array(n);

  // generate n die roll results and store in out array
  for (let i: number = 0; i < n; i++) {
    rolls[i] = Math.ceil(Math.random() * 6);
  }
  return rolls;
}


// find out how many dice to roll for a skill check
// inputs: character sheet, base/con/spec skill names, default attribute
// keeping this around just for convenience
export function SkillRoll (char: CharInfo, required:string[], attr:Stat):number[] {
  return Roll (SkillDice (char, required, attr));
}

// decouple determining skill dice and actually rolling them 
// * what if we want to generate a dice pool and split it, then roll each split?
// * what if we want to penalize the number of dice?
export function SkillDice (char: CharInfo, required:string[], attr:Stat):number {
  var skillLvl = 0;
  // nested if statements ON PURPOSE, I want to fail fast if BASE skill doesn't match
  char.skills.map((i:CharSkill) => {
    // skills might be noted with 1, 2, or 3 elements
    // we assume same # of elements in skill and skillLvl arrays
    if (i.skill[SkillTypes.BASE] === required[SkillTypes.BASE]) {
      if (i.skill.length > 1 &&
          i.skill[SkillTypes.GROUP] === required[SkillTypes.GROUP]) { 
        if (i.skill.length > 2 && 
            i.skill[SkillTypes.SPEC] === required[SkillTypes.SPEC]) { 
          skillLvl = i.skillLvl[SkillTypes.SPEC]
        } else {
          skillLvl = i.skillLvl[SkillTypes.GROUP]
        } 
      } else {
        skillLvl = i.skillLvl[SkillTypes.BASE];
      } // no else. WRONG SKILL. move on.
    }
  });

  // supposing we don't have a skill level
  if (skillLvl === 0) {
    // we want to check NAT if that's all a character has and AUG if that's present
    const statLvl=char.stats[attr].level;
    // instead of raising TN by 2 we'll halve the dice pool, rounding up
    skillLvl = Math.ceil(statLvl[statLvl.length-1] / 2);
  }

  return skillLvl;
}

// test a roll against target number, penalties, threshold value, etc
// inputs: outcome of Roll(), target number per die for a "success", required success level
// return: number of net successes which may be negative (often w/ attacks vs heavy armor)
export function Check (roll:number[], tn:number, threshold:number):number {
  var successes = 0;
  roll.map((d:number) => {
    if (d>=tn) successes++;
  });

  // sometimes we use negative success levels
  return successes-threshold; 
}

// get a buffed (cyberware, spells, etc) attribute value for a character
// always the last in the stat levels
export function BoostedAttr(char:CharInfo, attr:Stat):number {
  // maybe I need to do some object oriented programming at this point?
  return char.stats[attr].level[char.stats[attr].level.length-1];
}

// get the natural (no cyberware, spells, etc) attribute value for a character
export function NaturalAttr(char:CharInfo, attr:Stat):number {
  return char.stats[attr].level[AttrLvl.NAT];
}

// add dice instead of counting hits like Check
export function Sum(roll:number[]) {
  var total = 0;
  roll.map((d:number) => {
    total+=d;
  }); 
  return total;
}