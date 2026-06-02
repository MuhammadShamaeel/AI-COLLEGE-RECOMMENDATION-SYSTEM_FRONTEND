# EduNova — AI College Recommendation System (Frontend)

A modern AI-powered college discovery platform built using React, Vite, Tailwind CSS, and shadcn/ui.

The platform allows students to search colleges, apply advanced filters, compare options, and interact with an AI chatbot powered by Retrieval-Augmented Generation (RAG).

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| API Calls | Axios |
| Package Manager | npm / pnpm |

---

## Project Structure

```text
frontend/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── ChatbotInterface.jsx
│   │   │   ├── CollegeGrid.jsx
│   │   │   ├── SearchSection.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── FloatingParticles.jsx
│   │   │   └── ScrollAnimations.jsx
│   │   │
│   │   └── services/
│   │       └── api.js
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   │
│   ├── imports/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Features

### College Search

- Search colleges by course
- Search by state and location
- Program-level filtering
- Real-time filtering
- Fee range filtering

### College Grid

- Responsive card layout
- College details modal
- Course information display
- Fee sorting options
- Hostel and placement indicators

### AI Chatbot

- RAG-powered responses
- Real college data
- Conversation history
- Typing indicators
- Smooth UI interactions

### Authentication

- Login
- Registration
- JWT Authentication
- Demo Mode Access

### UI/UX Features

- Animated backgrounds
- Floating particles
- Smooth scrolling
- Responsive design
- Modern dark theme
- Mobile-friendly layout

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/MuhammadShamaeel/AI-COLLEGE-RECOMMENDATION-SYSTEM_FRONTEND.git

cd AI-COLLEGE-RECOMMENDATION-SYSTEM_FRONTEND
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Configure API URL

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Run Development Server

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### 5. Production Build

```bash
npm run build
```

### 6. Preview Build

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|------------|-------------|
| npm run dev | Start development server |
| npm run build | Build project |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

## Backend Requirements

Backend must be running with:

- Django REST Framework
- FAISS Vector Database
- Sentence Transformers
- Ollama LLM Service

Backend URL:

```text
http://localhost:8000
```

---

## Main Components

### SearchSection.jsx

- Search functionality
- Filter controls
- Sort options
- Clear filters

### CollegeGrid.jsx

- College cards
- Fee display
- Detailed modal
- Responsive layout

### ChatbotInterface.jsx

- AI conversation
- Session history
- Context awareness
- Smooth animations

### AuthPage.jsx

- Login
- Registration
- Validation
- Demo Mode

---

## Styling System

Theme variables:

```css
:root {
  --background: #0a0a1f;
  --foreground: #ffffff;
  --primary: #8b5cf6;
  --secondary: #06b6d4;
  --accent: #ec4899;
}
```

---

## Browser Support

- Chrome
- Firefox
- Safari
- Edge

---

## Troubleshooting

### API Connection Error

Verify:

```text
http://localhost:8000
```

Check:

- Backend running
- CORS configuration
- Environment variables

### Dependency Issues

```bash
rm -rf node_modules

npm install
```

### Styling Problems

Ensure:

- Tailwind CSS configured correctly
- theme.css imported
- Vite server restarted

---

## Future Enhancements

- Saved colleges
- College comparison
- Application reminders
- React Native app
- PWA support
- Theme switcher

---

## Contributors

**Muhammed Shamaeel K M**
- Frontend Development
- UI/UX Design

**Archana K**
- Backend Integration
- API Design

---

## License

Educational Project.

---

## Repository Links

Frontend Repository:
https://github.com/MuhammadShamaeel/AI-COLLEGE-RECOMMENDATION-SYSTEM_FRONTEND

Backend Repository:
https://github.com/MuhammadShamaeel/AI-COLLEGE-RECOMMENDATION-SYSTEM_BACKEND