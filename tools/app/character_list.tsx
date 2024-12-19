import React from "react";
import {CharInfo} from "./mechanics";

// render names from a JSON array of characters

export default function CharacterList ({chars}:{chars:CharInfo[]}) {
    let items = chars.map((c:CharInfo) => {
        return (<li key={c.name}>{c.name}</li>);
    });

    return <div key="character_list"><label>Active Characters</label><ul>{items}</ul></div>
}