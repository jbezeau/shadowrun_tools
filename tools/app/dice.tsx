import {Roll} from "./mechanics";

// export a crappy little dice roller, big things coming lol
export default function Dice({n} : {n:number}) {

  // actual drawable, like ok whatever
  return <div key="dice_roll"><label>Rolled</label>{JSON.stringify(Roll(n))}</div>;
}
