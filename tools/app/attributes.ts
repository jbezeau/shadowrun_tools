
// describe an attribute level
// array positions represent normal and enhanced attribute, enhanced is usually unaffected by magic
export const enum AttrLvl  {NAT, AUG}

// express an attribute as an array of values. 
// Natural stat (that most magic works on) is first position
// Augmented stat (cyber or spell) is next up
// ... but we can add more to the list for temporary circumstances like curses or poison 
// ... check level[level.length-1] rather than level[AttrLvl.AUG] to be safe
export interface CharAttr {
  level:number[],
}

// describe a character,
// attributes are unique and non-repeating
// stats array in mechanics is referenced by this enum
export const enum Stat {BOD, QUI, STR, CHA, INT, WIL, MAG, ESS, REA, INI}