import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../utils/axios';

const AI_CHAT_TIMEOUT_MS = 120000;

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    const priorHistory = chatHistory;

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const { data } = await api.post(
        '/api/ai/chat',
        {
          message: text,
          chatHistory: priorHistory,
        },
        { timeout: AI_CHAT_TIMEOUT_MS }
      );

      const reply = data?.response ?? data?.content;
      if (reply == null || reply === '') {
        throw new Error('Empty response from AI');
      }

      setChatHistory((prev) => [...prev, { role: 'assistant', content: String(reply) }]);
    } catch (error) {
      console.error('AI chat error:', error);
      let detail = 'Could not get a reply.';
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          detail =
            'Network error: is the backend running on port 5000? Check VITE_API_URL in frontend/.env.';
        } else {
          const d = error.response.data;
          const errField = d?.error;
          const serverMsg =
            (typeof errField === 'string' ? errField : null) ||
            (errField && typeof errField === 'object' ? errField.message : null) ||
            d?.message ||
            (Array.isArray(d?.errors) ? d.errors.map((e) => e?.message || e).join(' ') : null);
          detail = serverMsg || error.message || detail;
        }
      } else if (error instanceof Error) {
        detail = error.message;
      }
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Something went wrong: ${detail}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mr-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
        >
          ← Go Back
        </button>
        <SparklesIcon className="h-8 w-8 text-primary-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Resume Assistant</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 h-[500px] overflow-y-auto border border-gray-100 dark:border-gray-700">
        {chatHistory.length === 0 && !isLoading && (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-8">
            Ask anything about your resume, job search, or interviews.
          </p>
        )}
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[85%] text-left whitespace-pre-wrap break-words ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500 dark:text-gray-400">AI is thinking…</div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about your resume..."
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
