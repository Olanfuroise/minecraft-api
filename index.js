import express from "express";
import { Rcon } from "rcon-client";

const app = express();
app.use(express.json());

async function sendCommand(cmd) {
  const rcon = await Rcon.connect({
    host: "91.171.147.185", // ton IP publique
    port: 25575,
    password: "123456789"
  });

  await rcon.send(cmd);
  await rcon.end();
}

app.post("/cmd", async (req, res) => {
  const { command } = req.body;

  if (!command) return res.send("❌ Commande manquante");

  try {
    await sendCommand(command);
    res.send("✅ Commande envoyée !");
  } catch (err) {
    console.error(err);
    res.send("❌ Erreur RCON");
  }
});

app.listen(3000, () => console.log("API Railway en ligne"));
