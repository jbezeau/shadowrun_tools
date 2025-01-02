import React from "react";
import styles from "./Page.module.css";

// render a single attribute input
export default function StatInput ({name}:{name:string}) {
    return <div style={{display:"flex"}}>
            <label style={{flex:1}}>{name}</label>
            <input style={{flex:2}} type="number" role="attribute" name={name}/>
        </div>
}