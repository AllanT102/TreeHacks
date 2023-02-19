const express = require('express');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

router.post('/', (req, res) => {
    console.log(req.body.prompt);
    // const got = axios.get("http://localhost:3001/db");
    axios
    .get("https://finalspaceapi.com/api/v0/character/?limit=2", {
        responseType: "json",
    })
    .then(function (response) {
        console.log(response.data);
    });
    const toSend = "Here is the text that I will reference: '"+"'. I know that a list of the main ideas of this text are" + got.keyElemArray + "."
     + "Secondly, I also know that " + req.body.prompt + ". If that is in the list of main ideas of the text I gave you, can you remove it from the list and regenerate the list of main ideas of the text?";
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend
    })

    // also need to prompt if there's still stuff in array

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});


module.exports = router;