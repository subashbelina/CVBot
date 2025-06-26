import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SparklesIcon, 
  ArrowPathIcon, 
  XMarkIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  StopIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import api from '../utils/axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const AIAssistant = ({ section, onContentGenerated }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    if (!user) {
      toast.error('Please log in to use the AI Assistant');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      const response = await api.post('/api/ai/generate', {
        section,
        content: input,
        chatHistory: chatHistory
      });

      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: response.data.content };
      setChatHistory(prev => [...prev, aiMessage]);

      // Generate suggestions based on the response
      const suggestionsResponse = await api.post('/api/ai/suggestions', {
        section,
        content: response.data.content
      });
      setSuggestions(suggestionsResponse.data.suggestions);

      onContentGenerated(response.data.content);
      setInput('');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to generate content';
      setError(errorMessage);
      toast.error(errorMessage);
      // Add error message to chat
      setChatHistory(prev => [...prev, { 
        role: 'error', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = async (content) => {
    if (!content.trim()) return;
    if (!user) {
      toast.error('Please log in to use the AI Assistant');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/api/ai/improve', {
        section,
        content,
        chatHistory: chatHistory
      });

      // Add improvement to chat
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: `Improved version: ${response.data.content}`
      }]);

      onContentGenerated(response.data.content);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to improve content';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  if (!user) {
    return null; // Don't show AI Assistant if user is not logged in
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-96 mb-4 max-h-[600px] flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold dark:text-white">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatHistory.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : message.role === 'error'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Suggestions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Enter your ${section} details...`}
                  className="w-full p-3 pr-12 border dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  rows={1}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 bottom-2 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    <PaperAirplaneIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => handleImprove(input)}
                  disabled={isLoading || !input.trim()}
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <LightBulbIcon className="w-5 h-5" />
                  <span>Improve</span>
                </button>
                {isLoading && (
                  <button
                    onClick={() => setIsLoading(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
                  >
                    <StopIcon className="w-5 h-5" />
                    <span>Stop</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftIcon className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default AIAssistant; 