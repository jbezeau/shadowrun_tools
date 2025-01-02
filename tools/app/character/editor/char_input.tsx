import React from "react";
import StatInput from "./stat_input";

// form contents for character editor page
export default function CharInput () {
    return <div> 
        <h1>Character Entry</h1>
        <label>Name <input type="text" name="name"/></label>
        <label>Attributes
            <StatInput name="BOD"/>
            <StatInput name="QUI"/>
            <StatInput name="STR"/>
            <StatInput name="CHA"/>
            <StatInput name="INT"/>
            <StatInput name="WIL"/>
            <StatInput name="MAG"/>
            <StatInput name="ESS"/>
            <StatInput name="REA"/>
            <StatInput name="INI"/>
        </label>
        </div>
}