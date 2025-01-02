import { Stat } from "./attributes";

// describe one skill, character has an array of these
// array positions in skill and skillLvl correspond to general, concentration, and specialization
export const enum SkillTypes  {BASE, GROUP, SPEC};
export interface CharSkill {
  skill:string[],
  skillLvl:number[],
}

// just list out the root skills in 1e
// map them to related attribute for some sense of organization
// split "physical sciences" into chem and physics
// renamed "magical theory" to metaphysics
// renamed "demolitions" to "artillery" and moved it to technical
// renamed "computer" to "software" and "electronics" to "hardware"
// consolidated vehicle skill bases to land / sea / air
export const BaseSkills:Record<string, number> = {
    // combat
    "Stealth":Stat.BOD, "Athletics":Stat.BOD, "Unarmed":Stat.BOD, "Projectile":Stat.BOD,
    "Armed":Stat.QUI, "Firearms":Stat.QUI, "Throwing":Stat.BOD, "Gunnery":Stat.BOD, 

    // technical
    "Software":Stat.INT, "Hardware":Stat.INT, "Biotech":Stat.INT, "Artillery":Stat.INT,
    
    // theory
    "Chemistry":Stat.INT, "Physics":Stat.INT, "Biology":Stat.INT,
    "Psychology":Stat.WIL, "Sociology":Stat.WIL, "History":Stat.INT, "Metaphysics":Stat.WIL,

    // social
    "Leadership":Stat.CHA, "Interrogation":Stat.CHA, "Negotiation":Stat.CHA, "Etiquette":Stat.CHA,

    // vehicle
    "Driving":Stat.REA, "Sailing":Stat.REA, "Piloting":Stat.REA,
    
    // magical
    "Conjuring":Stat.WIL, "Sorcery":Stat.WIL,
} as const;

// examples of skill concentrations, not an exhaustive list
// skill specializations are too numerous: every named spell, weapon, vehicle, cyberware, etc
export const ConcentrationSkills:Record<string, string> = {
    // fighting
    "Striking":"Unarmed", "Grappling":"Unarmed", "Cyberweapon":"Unarmed",
    "Pole":"Armed", // long-reach weapons
    "Haft":"Armed", // normal length axes and hammers 
    "Hilt":"Armed", // swords and knives
    "Flexible":"Armed", // whips, nunchucks, meteor hammer / rope spear
    "Spear":"Throwing", "Axe":"Throwing", "Knife":"Throwing", "Star":"Throwing",

    // shooting
    "Bow":"Projectiles", "Atlatl":"Projectiles", 
    "Roped":"Projectiles", // thrown blade on a lead, grappling hook, lasso, sling, etc
    "Handgun":"Firearms", "Shotgun":"Firearms", "Submachinegun":"Firearms", "Rifle":"Firearms",
    "Machinegun":"Gunnery", "Flamethrower":"Gunnery", "Cannon":"Gunnery", "Launcher":"Gunnery",
    "Indirect":"Artillery", // high-angle shooting with mortars, cannon, rockets, trebuchet
    "Autonomous":"Artillery", // homing vs cruise missiles, satellites, drones 

    // vehicles
    "Car":"Driving", "Bike":"Driving", "Truck":"Driving", "Train":"Driving",
    "Wind":"Sailing", "Motor":"Sailing", "Submarine":"Sailing",
    "Hover":"Piloting", // low-altitude hovercraft and vectored thrust vehicles
    "Rotor":"Piloting", // high-altitude helicopters, quadcopters, etc.
    "Wing":"Piloting", // both airplane and winged ground effect

    // technical
    "Programming":"Software", "Cybercombat":"Software",
    "Invention":"Hardware", "Improvising":"Hardware",
    "Medicine":"Biotech", "Cybertech":"Biotech", "First-Aid":"Biotech",

    // magical
    "Named Spirits":"Conjuring", // dealing with special entities
    "Elemental":"Conjuring", 
    "Nature Spirit":"Conjuring", 
    "Watchers":"Conjuring", // minor spirits, nobodies
    "Banishing":"Conjuring", // bitches leave
    "Ritual":"Sorcery", // any spell cast as a group in a prepared location
    "Combat":"Sorcery", // schools of magic
    "Illusion":"Sorcery", 
    "Detection":"Sorcery", 
    "Healing":"Sorcery", 
    "Manipulation":"Sorcery",
    "Dispelling":"Sorcery", // undo button
} as const;