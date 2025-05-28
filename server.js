// server.js
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors()); // Allow requests from anywhere (for testing)
app.use(express.json());

const openai = new OpenAI({
  apiKey: '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', // <-- Put your OpenAI API key here
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'Error communicating with OpenAI' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
