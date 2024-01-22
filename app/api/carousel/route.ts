import { NextResponse } from 'next/server';
import { OpenAI } from "@langchain/openai";
import { SystemMessage } from "@langchain/core/messages";


type RequestBody = {
  narrationStyle: string;
  conversation: string
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  if (!body || !body.narrationStyle || !body.conversation) {
    return new Response("Invalid request body", { status: 400 })
  }

  const { narrationStyle, conversation } = body;

  const narrationScript = await narrationScriptService(
    narrationStyle,
    conversation
  )

  return NextResponse.json(narrationScript, { status: 200 })
}


const narrationScriptService = async (narrationStyle: string, conversation: string) => {

  const messages = [new SystemMessage(narrationStyle), new SystemMessage(conversation)]
  const llm = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct",
  });
  const narrationScript = await llm.invoke(messages)
  console.log("narrationScript", narrationScript)
  return narrationScript
}