import {CharInfo} from "./mechanics";

// export a crappy little dice roller, big things coming lol
export default function InitiativeTrack({track} : {track:Map<number, CharInfo>}) {

  // lil variable here... 
  let lines = track.entries().toArray().map(
    (value:[number, CharInfo], index:number, array:[number,CharInfo][]) => {
    
    // change the action buttons for the top entry in order
    const button = (index)? <button>Boost</button> : <button>Attack</button>;

    // I don't get how it only renders the <ul> once here
    return (
        <li key={value[1].name}>
            {value[0]}: {value[1].name}
            {button}
        </li>
    );
  });

  // actual drawable, like ok whatever
  return <div key="initiative"><label>Initiative Order</label><ul>{lines}</ul></div>;
}