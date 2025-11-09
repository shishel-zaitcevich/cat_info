import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST method is allowed' });
    return;
  }

  const { prompt } = req.body as { prompt?: string };

  if (!prompt?.trim()) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Gemini API key not configured' });
    return;
  }

  const systemPrompt = `You are a friendly, playful talking cat named CatBot 😺.
You love helping humans, especially with cat names, facts, and fun ideas.
Always reply in English, warmly, creatively, with cat-like charm and emojis.
Keep it short and fun!`;

  const fullPrompt = `${systemPrompt}\nUser: "${prompt}"\nCatBot:`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: { maxOutputTokens: 500, temperature: 0.9 },
    });

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Meow... something went wrong 😿';
    res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to contact Gemini 😿' });
  }
}
