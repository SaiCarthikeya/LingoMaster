import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI  from 'openai';
const openai = new OpenAI({ apiKey: "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" });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",// Update with the appropriate engine name
        messages: [{role: 'user', content: `Summarize the text: ${text}`}],
        max_tokens: 250,
        temperature: 0
    });

    console.log(completion);
    res.send(completion.choices[0].text);
});

const port = 3080;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
