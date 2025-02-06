# AcademIQ - Learn Smarter with AI 🎓

AcademIQ is an AI-powered academic learning platform that transforms education by providing instant, comprehensive learning experiences. It generates detailed lessons and interactive quizzes in real-time, making learning personalized and engaging.

![AcademIQ Screenshot](https://source.unsplash.com/random/1200x630/?education,learning)

## ✨ Features

### Frontend
- **Modern React Application** built with Vite
- **Responsive Design** with Tailwind CSS
- **Real-time Search History** tracking
- **Mobile-first Layout** with sidebar navigation
- **Beautiful UI Components** using Lucide React icons
- **Seamless User Experience** with instant feedback

### Backend (Django + DRF)
- **AI-Powered Content Generation** using GPT-3.5 Turbo
- **Visual Learning Support** with DALL-E 3 image generation
- **Interactive Quiz Generation** with hints and multiple-choice questions
- **RESTful API Architecture** using Django Rest Framework
- **Structured Learning Content** with overview, key details, and examples
- **Error Handling** and fallback mechanisms

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React

### Backend
- Django
- Django Rest Framework
- OpenAI API (GPT-3.5 Turbo & DALL-E 3)

## 🛠️ Installation

### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/obdif/AcademIQ.git
   cd academiq/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory
   ```bash
   cd ../backend
   ```

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables
   ```bash
   cp .env.example .env
   # Add your OpenAI API key and other configuration
   ```

5. Run migrations
   ```bash
   python manage.py migrate
   ```

6. Start the Django server
   ```bash
   python manage.py runserver
   ```

## 🔑 API Endpoints

### Generate Topic Content
```http
POST /api/generate-topic/
```
Generates comprehensive learning content including text explanations and optional visual aids.

**Request Body:**
```json
{
    "topic": "string"
}
```

### Generate Quiz Questions
```http
POST /api/generate-questions/
```
Creates interactive quiz questions with hints based on the topic.

**Request Body:**
```json
{
    "topic": "string"
}
```

## 🔒 Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key
DJANGO_SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- OpenAI for providing the GPT-3.5 Turbo and DALL-E 3 APIs
- The React and Django communities for excellent documentation and resources
- All contributors who help improve this project

---

Made with ❤️ by Adekunle Blessing