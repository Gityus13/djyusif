const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const openai = new OpenAI({
  apiKey: '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' // 🔑 Replace this with your real OpenAI API key!
});

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userMsg = req.body.message;

  const result = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userMsg }]
  });

  const reply = result.choices[0].message.content;
  res.json({ reply });
});

app.listen(3000, () => {
  console.log('✅ Server is running at http://localhost:3000');
});
