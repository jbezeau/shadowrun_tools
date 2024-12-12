// describe health statuses

export const enum WoundLevel {N=0, L=1, M=3, S=6, D=10};
export interface DamageCode {
    PWR:number,
    LVL:WoundLevel,
    STG:number,
    stun?:boolean,
}

// adjust damage level where positive successes = more damage
export function StageUp (successes:number, damage:DamageCode):DamageCode {
    // get number of steps up or down
    var steps:number = (successes > 0)?
        Math.floor(successes / damage.STG):
        Math.ceil(successes / damage.STG);
    var staged_damage:WoundLevel = damage.LVL;

    // step damage down level by level until Nil
    while (steps < 0) {
        switch (staged_damage) {
            case WoundLevel.L: {
                staged_damage = WoundLevel.N;
                break;
            }
            case WoundLevel.M: {
                staged_damage = WoundLevel.L;
                break;
            }
            case WoundLevel.S: {
                staged_damage = WoundLevel.M;
                break;
            }
            case WoundLevel.D: {
                staged_damage = WoundLevel.S;
                break;
            }
        }
        steps++;
    }

    // step damage up level by level until 10
    // base damage Nil does not step up
    while (steps > 0) {
        switch (staged_damage) {
            case WoundLevel.S: {
                staged_damage = WoundLevel.D;
                break;
            }
            case WoundLevel.M: {
                staged_damage = WoundLevel.S;
                break;
            }
            case WoundLevel.L: {
                staged_damage = WoundLevel.M;
                break;
            }
        }
        steps--;
    }
    // copy original damage code but with new damage level (N,L,M,S,D)
    const output:DamageCode = {...damage, LVL:staged_damage};
    return output;
}

// adjust damage where more successes = less damage
export function StageDown (success:number, damage:DamageCode):DamageCode {
    return StageUp (success * -1, damage);
}