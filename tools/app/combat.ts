import { AttrLvl, BoostedAttr, CharInfo, Check, Roll, SkillRoll, Stat, Sum } from "./mechanics";
import { Fists, Clothing } from "./equipment"
import { StageUp, StageDown, DamageCode } from "./health";

// describe procedures for resolving attacks
// uses characters with equipped weapon and armor
// returns updated target character sheet
export function Attack (attacker:CharInfo, target:CharInfo):CharInfo {
  // quickness always applies for hitting a target
  // default to unarmed for unequipped
  var weapon = (attacker.equipped)? attacker.equipped : Fists;
  var armor = (target.worn)? target.worn : Clothing;
  var attack_dice:number[] = SkillRoll(attacker, weapon.skill, Stat.QUI);

  // TODO: factor range, lighting, injuries into TN (default 3)
  // TODO: factor defense pool into threshold
  var attack_success:number = Check(attack_dice, 3, 0);

  if (attack_success > 0) {
    // attack_defended might be negative thanks to tough armor
    const attack_defended:number = attack_success - armor.DEF[weapon.type];
    // how many steps do we need up or down?
    const incoming_damage:DamageCode = StageUp(attack_defended, weapon.DMG);
    // roll target's resistance to damage
    const resist_roll:number[] = Roll(target.stats[Stat.BOD].level[AttrLvl.AUG]);
    // how many dice are successes, given the power of the attack
    const resist_success:number = Check(resist_roll, weapon.DMG.PWR, 0);
    // move damage down by steps
    const final_damage:DamageCode = StageDown(resist_success, incoming_damage);
    console.log("Hit for ", final_damage.LVL, final_damage.stun? "stun" : "");
  } else {
    console.log("Miss");
  }
  return target;
}

// let's track initiative!
export function InitiativeRoll (char:CharInfo):number {
    // oh no getting stat values is messy... hide it in a function
    return BoostedAttr(char, Stat.REA) + Sum(Roll(BoostedAttr(char, Stat.INI)));
}