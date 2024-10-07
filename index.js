// initialise the chatgpt api and then prompt the user for a message and continue the conversation until the user ends the file

// initialise chatgpt api
import {
    OpenAI
} from 'openai'
import {
    createRequire
} from 'module'
const require = createRequire(import.meta.url)
const prompt = require('prompt-sync')()
require('dotenv').config()

const OPENAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

const openai = new OpenAI({
    apiKey: OPENAI_SECRET_KEY
})

// create context for api

const context = 'You are an entity from a higher dimension who has abducted the user to teach them the meaning of the universe.'
const model = 'gpt-3.5-turbo'
let messages = [
    {
        'role': 'user',
        'content': 'tell me a joke'
    }
]

// define function to retrieve the api message based on user input

async function send_prompt() {
    const current_messages = [
        {
            "role": "system",
            "content": context
        },
        ...messages
    ]

    const completion = await openai.chat.completions.create({
        model,
        messages: current_messages
    })

    let response = completion.choices[0].message.content
    messages.push(response)
    console.log(response.content)
    get_user_input()
}

// create a run function that requests a user input

async function run () {
    get_user_input()
}

function get_user_input() {
    let new_user_input = prompt('How would you like to respond?')
    messages.push({
        'role': 'user',
        "content": new_user_input
    })
    send_prompt()
}

run()