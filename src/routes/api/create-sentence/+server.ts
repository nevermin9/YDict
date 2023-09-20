import type { RequestHandler } from "./$types"
import OpenAI from "openai"
import { PRIVATE_OPENAI_API_KEY } from "$env/static/private"

type Message = {
    role: "user" | "system" | "assistant"
    content: string
}

const getPrompt = (word: string): string => {
    return `You are a teacher of English with 30 years of experience. You need to make 5 sentences with word "${word}". The sentences should make sense, be in Present Simple Tense or Past Simple Tense, consist of 5-7 words maximum. Return messages as an array of strings to let me parse it with JSON.parse in JavaScript.`
}

const openai = new OpenAI({
    apiKey: PRIVATE_OPENAI_API_KEY,
})

export const GET: RequestHandler = async ({ url }) => {
    const word = url.searchParams.get("with")
    if (!word) {
        return new Response(JSON.stringify({ success: false }), { status: 400 })
    }
    console.log("the word=", word)
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: getPrompt(word),
            },
        ],
    })

    const result = completion.choices[0].message.content

    return new Response(result, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
