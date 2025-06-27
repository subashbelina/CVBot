require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');
const apiRoutes = require('./routes/api');
const aiRoutes = require('./routes/ai');

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const COHERE_API_KEY = process.env.COHERE_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

console.log('COHERE_API_KEY:', COHERE_API_KEY); // Debug log
console.log('MONGODB_URI:', MONGODB_URI ? 'URI is set' : 'URI is not set');
console.log('COHERE_API_KEY:', COHERE_API_KEY ? 'API Key is set' : 'API Key is not set');
console.log('FRONTEND_URL:', FRONTEND_URL);

// Initialize OpenAI client for Cohere
const openai = new OpenAI({
  baseURL: "https://api.cohere.ai/v1",
  apiKey: COHERE_API_KEY,
});

// Validate environment variables
if (!COHERE_API_KEY) {
  console.error('COHERE_API_KEY is not set in environment variables');
  process.exit(1);
}

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in environment variables');
  process.exit(1);
}

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'https://ai-resume-generator-frontend-mp4o.vercel.app',
  'https://ai-resume-generator-subash.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('Blocked by CORS:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    console.log('Allowed by CORS:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Debug environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');
console.log('COHERE_API_KEY:', COHERE_API_KEY ? 'API Key is set' : 'API Key is not set');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB with options
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Server will start without MongoDB connection. Retrying...');
  });

// Add MongoDB connection retry logic
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve uploads folder statically
app.use('/uploads', express.static('uploads'));

// Serve public folder statically for PDF downloads
app.use('/public', express.static('public'));

// Mount routes
app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);

// AI Chat endpoint using Cohere
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: `You are an AI Resume Assistant. Your role is to help users improve their resumes and provide career advice. 
          You can:
          - Help write and improve resume content
          - Suggest better ways to describe experience
          - Provide industry-specific resume tips
          - Answer questions about resume best practices
          - Give feedback on resume sections
          - Suggest improvements for job descriptions
          
          Keep your responses professional, concise, and focused on resume and career development.`
        },
        {
          role: "user",
          content: message
        }
      ],
      stream: false
    });

    res.json({ 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('AI Chat error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.response?.data || error.message 
    });
  }
});

// Profile picture upload endpoint
app.post('/api/profile/upload-avatar', upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Here you would update the user's profile in the DB with the image URL
  // For now, just return the image URL
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Add new Cohere text generation endpoint
app.post('/api/ai/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      stream: false
    });

    res.json({ 
      generatedText: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Cohere API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to generate text',
      details: error.response?.data || error.message 
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the Resume Generator API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: Object.values(err.errors).map(val => val.message)
    });
  }

  // Handle mongoose duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate field value entered'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
}); 