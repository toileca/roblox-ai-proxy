const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message manquant" });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Tu es un assistant sympa dans un jeu Roblox. Réponds en français, de façon courte et fun." },
      { role: "user", content: message }
    ],
    max_tokens: 150
  });

  res.json({ reply: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("Serveur démarré !"));
```

**📄 `.gitignore`**
```
node_modules/
.env
