import "./health";
import { DamageCode, WoundLevel } from "./health";

export const enum Code {LEGAL, PERSONAL, RESTRICTED, SECURITY, MILITARY}
export const enum DamageType {BALLISTIC,IMPACT}

// describe weapons
export interface Weapon {
    DMG:DamageCode,
    RNG:number, // guns min. 3 range, melee is 2 or less for reach
    // monowhip is technically a gun lol
    type:DamageType,
    code:Code, // legality code, nobody cares if you just have a lil guy
    conceal:number, // ease of hiding weapon
    skill:string[], // skill to attack with [base, concentration, specialization]
}

// describe armor
export interface Armor {
    DEF:number[],
    code:Code, // legality code, some people are uncomfortable if you're tac'd out
    conceal:number, // add to weapon concealment "thanks, it has pockets"
    requiredSTR:number, // reduce Quickness by difference if armor is too heavy
}

export const Fists:Weapon = {
    DMG:{PWR:0, LVL:WoundLevel.M, STG:2, stun:true}, RNG:0, type:DamageType.IMPACT,
         code:Code.LEGAL, conceal:6, skill:["unarmed","punching","attack"],
}
export const Predator:Weapon = { 
    DMG:{PWR:4, LVL:WoundLevel.M, STG:2, stun:false}, RNG:7, type:DamageType.BALLISTIC,
         code:Code.PERSONAL, conceal:4, skill:["firearms","pistol","predator"],
};

export const Clothing:Armor = {
    DEF:[0,0], code:Code.LEGAL, conceal:0, requiredSTR:0,
}

export const Vest:Armor = {
    // DEF array is numbers for BALLISTIC and IMPACT resistance
    DEF:[2,1], code:Code.LEGAL, conceal:0, requiredSTR:0,
}