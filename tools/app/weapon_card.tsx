import React from "react";
import {Weapon} from "./equipment";
import { SkillTypes } from "./mechanics";

// render a JSON doc for weapon stats

// typescript function headers for react are really redundant
export default function WeaponCard ({wpn}:{wpn:Weapon}) {
    // the only places I store a weapon's name is the Type name and skill specialization I guess
    // time to run what you brung, it seems like
    let name:string = wpn.skill[SkillTypes.SPEC];
    return <div key={name}>{JSON.stringify(wpn)}</div>;
}