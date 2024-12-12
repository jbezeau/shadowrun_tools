import React from "react";
import {CharInfo} from "./mechanics";

// render a JSON doc for character stats

// typescript function headers for react are really redundant
export default function Character ({char}:{char:CharInfo}) {
    let name:string = char.name;
    return <div key={name}>{JSON.stringify(char)}</div>;
}