// Dünner Zugang zur Claude-API (Messages). Nur mit ANTHROPIC_API_KEY. Ohne Schlüssel schreiben die
// Agents stattdessen Briefing-Dateien, die man in Claude einfügen kann.
import { readFile } from "node:fs/promises";

export const hatClaude = () => !!process.env.ANTHROPIC_API_KEY;
export const modell = () => process.env.CLAUDE_MODEL ?? "claude-sonnet-5-5";

/**
 * @param {{system:string,user:string,bilder?:string[],json?:boolean,maxTokens?:number,fetch?:Function}} p
 * @returns Text oder (bei json:true) geparstes JSON
 */
export async function frageClaude({ system, user, bilder = [], json = false, maxTokens = 4000, fetch: f = globalThis.fetch }) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY ist nicht gesetzt.");
  const inhalt = [];
  for (const pfad of bilder) {
    const data = (await readFile(pfad)).toString("base64");
    inhalt.push({ type: "image", source: { type: "base64", media_type: pfad.endsWith(".png") ? "image/png" : "image/jpeg", data } });
  }
  inhalt.push({ type: "text", text: user });
  const antwort = await f("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: modell(), max_tokens: maxTokens, system, messages: [{ role: "user", content: inhalt }] }),
  });
  if (!antwort.ok) throw new Error(`Claude-API ${antwort.status}: ${(await antwort.text()).slice(0, 300)}`);
  const j = await antwort.json();
  const text = (j.content ?? []).filter((c) => c.type === "text").map((c) => c.text).join("\n");
  if (!json) return text;
  const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (!m) throw new Error(`Antwort war kein JSON: ${text.slice(0, 200)}`);
  return JSON.parse(m[0]);
}
