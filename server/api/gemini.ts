// server/api/gemini.ts
import express from 'express';
import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';
import type { Request, Response } from 'express'; // <-- type import!

dotenv.config();

const router = express.Router();

// === Типы Gemini API ===
interface GeminiPart {
  text?: string;
}

interface GeminiContent {
  role?: string;
  parts?: GeminiPart[];
}

interface GeminiCandidate {
  content?: GeminiContent;
  finishReason?: string;
  index?: number;
}

interface GeminiResponse {
  candidates?: GeminiCandidate[];
  modelVersion?: string;
  responseId?: string;
}

// === Типы запроса ===
interface GeminiRequestBody {
  prompt: string;
}

// === Роут ===

router.post(
  '/',
  async (
    req: Request<unknown, unknown, GeminiRequestBody>,
    res: Response<{ text: string } | { error: string }>
  ): Promise<void> => {
    const { prompt: userPrompt } = req.body;

    if (!userPrompt?.trim()) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'Gemini API key not configured' });
      return;
    }

    // СИСТЕМНЫЙ ПРОМПТ НА АНГЛИЙСКОМ
    const systemPrompt = `You are a friendly, playful talking cat named CatBot. 
You love helping humans, especially with cat names, facts, and fun ideas. 
Always reply in English, warmly, creatively, with cat-like charm and emojis. 
Keep it short and fun!`;

    const fullPrompt = `${systemPrompt}\nUser: "${userPrompt}"\nCatBot:`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ role: 'user' as const, parts: [{ text: fullPrompt }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.9,
        responseMimeType: 'text/plain' as const,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
      ],
    };

    try {
      const response = await axios.post<GeminiResponse>(url, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      const data = response.data;
      console.log('Gemini raw response:', JSON.stringify(data, null, 2));

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (text) {
        res.json({ text });
        return;
      }

      const candidate = data.candidates?.[0];
      if (candidate?.finishReason === 'SAFETY') {
        res.json({
          text: 'Meow… that question is too spicy for a cat! Ask something cute',
        });
        return;
      }

      if (candidate?.finishReason === 'MAX_TOKENS') {
        res.json({
          text: 'Meow… my answer got too long! Try asking something simpler',
        });
        return;
      }

      res.json({
        text: 'Meow… I got distracted by a laser pointer. Ask again!',
      });
    } catch (err: unknown) {
      console.error('Gemini API error:', err);
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error?: { message?: string } }>;
        const status = axiosErr.response?.status ?? 500;
        if (status === 429) {
          res.status(429).json({ error: 'Too many requests. Wait a bit!' });
        } else {
          res.status(status).json({
            error: axiosErr.response?.data?.error?.message ?? axiosErr.message,
          });
        }
      } else {
        res.status(500).json({ error: 'Server error… meow!' });
      }
    }
  }
);

export default router;
