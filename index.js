const express = require("express");

const app = express();
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message manquant" });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Tu es un assistant sympa dans un jeu Roblox. Réponds en français, de façon courte et fun." },
          { role: "user", content: message }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data));

    if (data.choices && data.choices[0]) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      console.log("Erreur Groq:", JSON.stringify(data));
      res.status(500).json({ error: "Erreur Groq", details: data });
    }
  } catch (err) {
    console.log("Erreur serveur:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Serveur démarré !"));
