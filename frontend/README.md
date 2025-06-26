# AI Resume Generator Frontend

This is the frontend application for the AI Resume Generator. It's built with React, Vite, and Tailwind CSS.

## Features

- Modern, responsive UI with Tailwind CSS
- User authentication and authorization
- Resume creation and editing
- AI-powered resume suggestions
- Multiple resume templates (Modern, Classic, Sidebar, Creative, Minimalist, Executive)
- **PDF export functionality** (Download your resume as a PDF from any preview)
- **Print functionality** (Print only the resume preview, not the whole page)
- **Live preview** with print/PDF controls
- Clean print output (only the resume preview is printed)
- Customizable resume sections and templates

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Usage

- **Create or edit a resume**: Fill out your information and select a template.
- **Show Preview**: Click the "Show Preview" button to see a live preview of your resume.
- **Download PDF**: In the preview area, click the "Download PDF" button to export your resume as a PDF.
- **Print**: Use the "Print" button (in the preview area or header) to print only the resume preview. All other UI will be hidden in the printout.
- **Switch templates**: Change the template at any time to see your resume in different styles.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── contexts/       # React contexts
  ├── pages/          # Page components
  ├── services/       # API services
  ├── utils/          # Utility functions
  ├── App.jsx         # Main App component
  └── main.jsx        # Entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

function Layout() {
  // ... component code ...
}

export default Layout; 