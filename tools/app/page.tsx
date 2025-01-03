// game code
import { InitiativeStart } from "./combat";
import { CharInfo } from "./mechanics";
import Dice from "./dice";

// display code
import Character from "./character_card";
import CharacterList from "./character_list";
import InitiativeTrack from "./initiative_track";

export const metadata = {
  title: "output test",
};

export default async function Page() {
  // fuckin' await
  let apiCall = await fetch("http://localhost:3000/character");
  let greeting = await apiCall.json();
  let example:CharInfo = 
  {
    name:"Trish Panda", 
    stats:[{level:[3]}, {level:[3]}, {level:[3]}, // plysical (body, quickness, strength)
           {level:[3]}, {level:[3]}, {level:[3]}, // mental (charisma, intelligence, willpower)
           {level:[0]}, {level:[6]},              // magic (magic, essence)
           {level:[3]}, {level:[1]}],             // initiative (reaction, dice)
    skills:[],
  };

  return <>
    <h1>{greeting}</h1>
    <Dice n={3} />
    <Character char={example} />
    <InitiativeTrack track={InitiativeStart([example])} />
    <CharacterList chars={[example]} />
    </>;
};
