import {CharInfo} from "./mechanics";
import { TrackerValues } from "./combat";

// export a crappy little dice roller, big things coming lol
export default function InitiativeTrack({track} : {track:Map<number, CharInfo>}) {

  // lil variable here... 
  let lines = track.entries().toArray().map(
    (value:[number, CharInfo], index:number, array:[number,CharInfo][]) => {
    
    // basic character name 
    const char = <div>{value[TrackerValues.INIT]}: {value[TrackerValues.CHAR].name}</div>;

    // taggage for selecting this character as an attack option
    const target = <div><label>Select as target<input type="checkbox"/></label></div>; 

    // change the action buttons for the top entry in order
    const attackButton = <button>Attack Selected Targets</button>;
    const boostButton = <button>Boost Initiative</button>; 

    // draw different character options for the top of the initiative list
    if (index === 0) {
        return (<li key={value[TrackerValues.CHAR].name}>{target}{char}{attackButton}</li>);
    }
    return (<li key={value[TrackerValues.CHAR].name}>{target}{char}{boostButton}</li>);
  });

  // actual drawable, like ok whatever
  return <div key="initiative"><label>Initiative Order</label><ul>{lines}</ul></div>;
}