const request = require('supertest');
const express = require('express');

jest.mock('../services/aiContentService', () => ({
  generateSummary: jest.fn(),
  enhanceJobDescription: jest.fn(),
  suggestSkills: jest.fn(),
  generateContent: jest.fn(),
  improveContent: jest.fn(),
  generateSuggestions: jest.fn(),
}));

const aiService = require('../services/aiContentService');
const aiRoutes = require('./ai');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/ai', aiRoutes);
  return app;
}

describe('AI routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/ai/chat returns 400 when message missing', async () => {
    const app = createApp();
    const res = await request(app).post('/api/ai/chat').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Message is required');
  });

  test('POST /api/ai/chat passes filtered history to service', async () => {
    aiService.generateContent.mockResolvedValueOnce('Hello back');
    const app = createApp();
    const res = await request(app).post('/api/ai/chat').send({
      message: 'Hi',
      chatHistory: [
        { role: 'user', content: 'u1' },
        { role: 'assistant', content: 'a1' },
        { role: 'system', content: 'x' },
        { foo: 'bar' },
      ],
    });

    expect(res.status).toBe(200);
    expect(res.body.response).toBe('Hello back');
    expect(aiService.generateContent).toHaveBeenCalledWith('general', 'Hi', [
      { role: 'user', content: 'u1' },
      { role: 'assistant', content: 'a1' },
    ]);
  });
});
