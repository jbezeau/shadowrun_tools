import { AttrLvl, BoostedAttr, CharInfo, Check, Roll, SkillDice, Stat, Sum } from "./mechanics";
import { Fists, Clothing, Weapon } from "./equipment"
import { StageUp, StageDown, DamageCode } from "./health";

// describe procedures for resolving attacks
// uses characters with equipped weapon and armor
// returns updated target character sheet
export function SingleAttack (attacker:CharInfo, target:CharInfo):CharInfo {
  // quickness always applies for hitting a target
  // default to unarmed for unequipped
  var weapon = (attacker.equipped)? attacker.equipped : Fists;
  var attack_dice:number = SkillDice(attacker, weapon.skill, Stat.QUI);
  return SubAttack (attack_dice, weapon, target);
}

// multi-attack:
// * generate dice pool (skill + rounds fired)
// * allow melee sweep-attack with 0 autofire
// * split pool dice evenly across targets, with remainder going to the first one
export function MultiAttack (attacker:CharInfo, autofire:number, targets:CharInfo[]) {
  const weapon = (attacker.equipped)? attacker.equipped : Fists;
  const total_dice:number = SkillDice(attacker, weapon.skill, Stat.QUI) + autofire;
  const split_dice:number = Math.floor(total_dice/targets.length);
  var remaining_dice:number = total_dice % targets.length;
  var injured_targets:CharInfo[]=targets;
  var i = 0;

  targets.map((t:CharInfo) => {
    injured_targets[i] = SubAttack(split_dice+remaining_dice, weapon, t);
    remaining_dice=0;
    i++;
  });
  return injured_targets;
}

// common code between SingleAttack and MultiAttack
// TODO: unit test
export function SubAttack (attack_dice:number, weapon:Weapon, target:CharInfo):CharInfo {
  // TODO: factor range, lighting, injuries into TN (default 3)
  // TODO: factor defense pool into threshold
  var armor = (target.worn)? target.worn : Clothing;
  var attack_success:number = Check(Roll(attack_dice), 3, 0);

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
// basic roll for a single character
export function InitiativeRoll (char:CharInfo):number {
    // oh no getting stat values is messy... hide it in a function
    return BoostedAttr(char, Stat.REA) + Sum(Roll(BoostedAttr(char, Stat.INI)));
}

// roll everyone's initiative and return a track
export function InitiativeStart (characters:CharInfo[]):Map<number, CharInfo> {
    var track:Map<number, CharInfo>=new Map;
    var i=0;
    characters.map((c:CharInfo) => {
        track.set(InitiativeRoll(c), c);
        i++;
    });
    return track;
}

// return the next initiative value
export function InitiativeNum (track:Map<number, CharInfo>):number {
    return track.keys().reduce((a, b) => {return (b > a)? b : a});
}

// return the character next to act
// might be undefined if there's nobody to pick
export function InitiativeChar (track:Map<number, CharInfo>):CharInfo|undefined {
    return track.get(InitiativeNum(track));
}

// remove the character who acted in NextChar
export function InitiativeUpdate (track:Map<number, CharInfo>):Map<number, CharInfo> {
    const nextNum = InitiativeNum(track);
    const nextChar = InitiativeChar(track);

    // this lowkey keeps us from setting nextChar if happens to be undefined
    if (track.delete(nextNum) && nextNum >= 10) {
        if (nextChar) { track.set(nextNum-7, nextChar) }
    }

    return track;
}