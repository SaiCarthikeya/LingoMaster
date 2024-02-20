const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: "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" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    const completion = await openai.complete({
        model: "gpt-3.5-turbo", // Update with the appropriate engine name
        prompt: `You need to summarize the following text, remove unnecessary text, and give only the main points like a paragraph: ${text}`,
        max_tokens: 250,
        temperature: 0
    });

    console.log(completion.choices[0].text);
    res.send(completion.choices[0].text);
});

const port = 3080;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
