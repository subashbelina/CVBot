# AI Resume Generator

A full-stack application that helps users create professional resumes with AI-powered suggestions and multiple templates.

## Project Structure

This is a monorepo containing both frontend and backend applications:

```
.
├── frontend/         # React frontend application
├── backend/         # Node.js/Express backend application
├── package.json     # Root package.json for workspace management
└── README.md        # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (v4.4 or higher)

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and set your values:
```
cp .env.example .env
```
Required variables: `PORT`, `MONGODB_URI`, `HF_API_KEY`, `FRONTEND_URL`. See `.env.example` for details.

4. Start the development server:
```bash
npm run dev
```

The backend server will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and set `VITE_API_URL` (e.g. `http://localhost:5000`). See `.env.example` for optional variables.

4. Start the development server:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

## Features

- User authentication and authorization
- Resume creation and editing
- AI-powered resume suggestions
- Multiple resume templates
- PDF export functionality
- Modern, responsive UI
- Real-time preview
- Secure data storage

## Development

### Backend Development

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

### Frontend Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 