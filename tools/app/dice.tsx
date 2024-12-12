import {Roll} from "./mechanics";

// export a crappy little dice roller, big things coming lol
export default function Dice({n} : {n:number}) {

  // lil variable here
  let items = Roll(n).map((i:number) => {
    // I don't get how it only renders the <ul> once here
    return (
      <ul>
        <li>{i}</li>
      </ul>
    );
  });

  // actual drawable, like ok whatever
  return <>{items}</>;
}
