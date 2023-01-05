import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import {Configuration, OpenAIApi} from "openai"

const configuration = new Configuration({
    apiKey: "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",
});


const openai = new OpenAIApi(configuration);


const app = express()

app.use(cors())

app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hello world"
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt
        console.log(req.body.prompt)

        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `${prompt}`,
            temperature: 1,
            max_tokens: 3000,
            top_p: 1.0,
            frequency_penalty: 0.25,
            presence_penalty: 0.2,
        })


        res.status(200).send({
            bot: await response.data.choices[0].text
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error
        })
    }
})


app.listen(5000, () => console.log("listen http://localhost:5000"))