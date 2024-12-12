import Dice from "./dice";
import Character from "./character_card";
import { CharInfo } from "./mechanics";

export const metadata = {
  title: "output test",
};

export default function Page() {
  let example:CharInfo = 
  {
    name:"Trish Panda", 
    stats:[],
    skills:[],
  };

  return <>
    <h1>App Router</h1>
    <Dice n={3} />
    <Character char={example} />
    </>;
};
