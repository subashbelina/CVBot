# Deployment Guide

This guide will help you deploy the AI Resume Generator application to Vercel (Frontend) and Render (Backend).

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository with your code

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set the following configuration:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Environment Variables**
   Add these environment variables in Vercel:
   ```
   VITE_API_URL=https://your-backend-app-name.onrender.com
   VITE_APP_NAME=AI Resume Generator
   VITE_APP_VERSION=1.0.0
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at `https://your-app-name.vercel.app`

## 🔧 Backend Deployment (Render)

### Prerequisites
- Render account
- MongoDB Atlas database
- Hugging Face API token (`HF_API_KEY`)

### Steps

1. **Prepare MongoDB**
   - Create a MongoDB Atlas cluster
   - Get your connection string
   - Replace `<password>` with your actual password

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `ai-resume-generator-backend`
     - **Root Directory**: `backend`
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Environment Variables**
   Add these environment variables in Render:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-generator?retryWrites=true&w=majority
   HF_API_KEY=your_huggingface_token_here
   FRONTEND_URL=https://your-frontend-app-name.vercel.app
   PORT=10000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for the build to complete
   - Your API will be available at `https://your-backend-app-name.onrender.com`

## 🔗 Connect Frontend to Backend

1. **Update Frontend Environment**
   - In Vercel, update the `VITE_API_URL` environment variable with your Render backend URL
   - Redeploy the frontend

2. **Update Backend CORS**
   - In Render, update the `FRONTEND_URL` environment variable with your Vercel frontend URL
   - Redeploy the backend

## 📁 File Structure

```
ai-resume-generator/
├── frontend/
│   ├── vercel.json          # Vercel configuration
│   ├── env.production       # Production environment variables
│   └── src/
│       └── utils/
│           └── axios.js     # API configuration
├── backend/
│   ├── render.yaml          # Render configuration
│   ├── package.json         # Updated with start script
│   └── server.js            # Main server file
└── DEPLOYMENT.md           # This file
```

## 🔧 Configuration Files

### Frontend (Vercel)
- `vercel.json`: Vercel deployment configuration
- `env.production`: Production environment variables
- Updated `axios.js`: Uses environment variables for API URL

### Backend (Render)
- `render.yaml`: Render deployment configuration
- Updated `package.json`: Includes start script and Node.js version requirements

## 🌐 Environment Variables

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend-app-name.onrender.com
VITE_APP_NAME=AI Resume Generator
VITE_APP_VERSION=1.0.0
```

### Backend (Render)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-generator
HF_API_KEY=your_huggingface_token_here
FRONTEND_URL=https://your-frontend-app-name.vercel.app
PORT=10000
```

## 🚨 Important Notes

1. **CORS Configuration**: The backend is configured to accept requests from the frontend URL
2. **Environment Variables**: Make sure to set all required environment variables in both platforms
3. **Database**: Use MongoDB Atlas for production database
4. **API Keys**: Keep your API keys secure and never commit them to version control
5. **Free Tier Limits**: Both Vercel and Render have free tier limitations

## 🔄 Deployment Process

1. **Backend First**: Deploy the backend to Render first
2. **Get Backend URL**: Note the Render service URL
3. **Update Frontend**: Set the backend URL in frontend environment variables
4. **Deploy Frontend**: Deploy the frontend to Vercel
5. **Update Backend CORS**: Set the frontend URL in backend environment variables
6. **Test**: Verify both services are working correctly

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check that `FRONTEND_URL` is set correctly in backend
   - Verify the frontend URL in the CORS configuration

2. **API Connection Issues**
   - Check that `VITE_API_URL` is set correctly in frontend
   - Verify the backend is running and accessible

3. **Build Failures**
   - Check the build logs in both platforms
   - Verify all dependencies are installed
   - Check for syntax errors in the code

4. **Environment Variables**
   - Make sure all required environment variables are set
   - Check for typos in variable names
   - Verify the values are correct

### Support

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

## ✅ Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Database connected
- [ ] API keys configured
- [ ] Application tested
- [ ] Domain configured (optional) 