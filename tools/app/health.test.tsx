import { test, expect } from "vitest";
import { DamageCode, StageUp, StageDown, WoundLevel } from "./health";

// test the logic and types we use for dealing with health
test ("Stage Damage Up", () => {
    const dmgM:DamageCode = {PWR:4,LVL:WoundLevel.M,STG:2};
    
    // stage up from Moderate
    expect(StageUp(1,(dmgM)).LVL).toBe(WoundLevel.M);
    expect(StageUp(2,(dmgM)).LVL).toBe(WoundLevel.S);
    expect(StageUp(5,(dmgM)).LVL).toBe(WoundLevel.D);
    expect(StageUp(8,(dmgM)).LVL).toBe(WoundLevel.D);
    expect(StageUp(-1,(dmgM)).LVL).toBe(WoundLevel.M);
    expect(StageUp(-2,(dmgM)).LVL).toBe(WoundLevel.L);
    expect(StageUp(-4,(dmgM)).LVL).toBe(WoundLevel.N);
    expect(StageUp(-7,(dmgM)).LVL).toBe(WoundLevel.N);
    
    // stage down from Moderate
    expect(StageDown(1,dmgM).LVL).toBe(WoundLevel.M);
    expect(StageDown(2,dmgM).LVL).toBe(WoundLevel.L);
    expect(StageDown(-2,dmgM).LVL).toBe(WoundLevel.S);

});