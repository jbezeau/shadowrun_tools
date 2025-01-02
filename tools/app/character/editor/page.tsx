import StatInput from "./stat_input";
import Form from "next/form";
import styles from "./Page.module.css";

// write out a form that allows character data input
export default function Page() {
    async function handleSubmit (data:FormData) {
        "use server";
        console.log("Submit character info: ", data);
        var bodyData = {name:data.get("name")};
        await fetch("http://localhost:3000/character", {
            method:"POST", 
            body:JSON.stringify(bodyData),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
            },
        });
    };

    // post to /character and get caught by ../route.ts POST function
    return (
        <Form action={handleSubmit}>
            <div style={{display:"flex"}} >
                <h1 style={{padding:"5px"}}>Character Entry</h1>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <h2 style={{flex:2, padding:"5px"}}>Name</h2>
                    <input style={{flex:2}} type="text" name="name"/>
                    <h2 style={{flex:2, padding:"5px"}}>Attributes</h2>
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
                    <input className={styles.button} type="submit" name="Submit"/>
                </div>
            </div>
        </Form>
    );
}