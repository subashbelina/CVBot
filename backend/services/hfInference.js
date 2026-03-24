const axios = require('axios');

/**
 * Hugging Face Inference Providers (OpenAI-compatible router).
 * The legacy api-inference.huggingface.co endpoint is deprecated.
 * @see https://huggingface.co/docs/api-inference/quicktour
 */
const ROUTER_CHAT_URL = 'https://router.huggingface.co/v1/chat/completions';

/** Default model — use :fastest / :cheapest / :preferred or provider suffix per HF docs */
const DEFAULT_MODEL = 'Qwen/Qwen2.5-7B-Instruct:fastest';

const MAX_RETRIES = 5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveModel() {
  return process.env.HF_MODEL || DEFAULT_MODEL;
}

function extractRouterError(data) {
  if (!data) return 'Unknown error';
  if (typeof data === 'string') return data;
  if (data.error) {
    const e = data.error;
    if (typeof e === 'string') return e;
    if (e.message) return e.message;
    return JSON.stringify(e);
  }
  if (data.message) return data.message;
  return JSON.stringify(data).slice(0, 400);
}

/**
 * OpenAI-compatible chat completions on the HF router.
 */
async function chatCompletion(messages, options = {}) {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) {
    throw new Error('HF_API_KEY is not set');
  }

  const model = options.model || resolveModel();
  const maxTokens = options.max_tokens ?? options.max_new_tokens ?? 1024;
  const temperature = options.temperature ?? 0.7;

  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await axios.post(
        ROUTER_CHAT_URL,
        {
          model,
          messages,
          stream: false,
          max_tokens: maxTokens,
          temperature,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 120000,
        }
      );

      const data = response.data;
      const content = data?.choices?.[0]?.message?.content;
      if (content != null && String(content).trim() !== '') {
        return String(content).trim();
      }
      throw new Error(extractRouterError(data));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 503 && attempt < MAX_RETRIES - 1) {
        const waitMs = Math.min(2000 * 2 ** attempt, 30000);
        await sleep(waitMs);
        lastError = err;
        continue;
      }
      if (axios.isAxiosError(err) && err.response?.data) {
        const msg = extractRouterError(err.response.data);
        throw new Error(`Hugging Face API error: ${msg}`);
      }
      throw err;
    }
  }
  throw lastError || new Error('Hugging Face request failed after retries');
}

/** Single user message (used by resume section prompts). */
async function generateText(prompt, options = {}) {
  return chatCompletion([{ role: 'user', content: prompt }], options);
}

/** System + user (used by aiService). */
async function generateChat(systemPrompt, userMessage, options = {}) {
  return chatCompletion(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    options
  );
}

module.exports = { generateText, generateChat, chatCompletion };
