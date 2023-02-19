const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

router.post('/', (req, res) => {
    console.log(req.body.prompt);
    const text = axios.get("http://localhost:3001/db").text;
    const toSend = "Here is the text that I will reference: '"+text+"'. I know that the main ideas of this text are" +  + ". Please generate me a list of the main ideas of the text, separated by commas.";
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend
    })

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});

// async function runCompletion () {
//     const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "How are you today?",
//     });
//     console.log(completion.data.choices[0].text);
// }

// runCompletion();

module.exports = router;