import { BaseSkills } from "../../skills";
import React from "react";

export default function SkillInput () {
    // we should go for an unobtrusive picker kind of thing
    // also we want a list of previously added skills ... put this in the parent directly
    // previously added skills need to be removable, 
    // previously added skills should have a follow-on input for concentration

    // totally cool to just submit the whole character form for each change
    let skillOptions = Object.keys(BaseSkills).map((skill:string, index:number, array:string[]) => {
        return <option value={skill} role="skill_selection">{skill}</option>
    });

    return <div style={{display:"flex", flexDirection:"row"}}>
            <label style={{padding:"5px"}}>Choose skill</label>
            <select name="skill" role="skill_selector">{skillOptions}</select>
            <input name="points" role="skill_value" type="number"/>
            <input name="Add" role="skill_add" type="submit"/>
        </div>
}