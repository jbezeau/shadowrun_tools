import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Message {
    _id:ObjectId,
    msg:string,
}

function ConnectToDB (): MongoClient {
    return new MongoClient("mongodb://localhost:27017/shadowrun");
}

// read character from collection by name
export async function GET() {
    const client:MongoClient = ConnectToDB();
    client.connect();

    const messages:Collection<Document> = client.db().collection("messages");
    const doc = await messages.findOne<Message>({});
    client.close();

    return NextResponse.json(JSON.stringify(doc?doc.msg:":("));
}

//write character to collection by name
export async function POST(req:NextRequest, res:NextResponse) {
    //Get the Form Data
    console.log("hit character POST");
    const data = await req.json();
    console.log(data);

    const client:MongoClient = ConnectToDB();
    client.connect();

    const characters = client.db().collection("characters");
    const output = await characters.insertOne(data);
    client.close();
    console.log(output);

    //Response 
    return NextResponse.json(output);
}