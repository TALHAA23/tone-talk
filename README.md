# ToneTalk 🗣️

A minimal AI chatbot application that lets you chat with three distinct personality bots, each with their own unique communication style and tone.

## 🤖 Meet the Bots

### 1. Gen Alpha Bot 🔥

Your terminally online bestie who speaks fluent brainrot. Expect responses packed with rizz, no cap energy, and all the latest slang that'll either make you cringe or feel absolutely based.

**Style**: Modern internet slang, Gen Alpha terminology (rizz, sigma, skibidi, based, etc.)

### 2. Sarcastic Teenager Bot 😒

The digital embodiment of eye-rolls and sighs. This bot has mastered the art of being helpful while making you feel slightly judged. Prepare for sass with a side of actual answers.

**Style**: Sarcastic, dramatic, but ultimately helpful with teenage attitude

### 3. ELI5 Explainer Bot 👶

Your patient friend who breaks down everything into bite-sized, easy-to-understand pieces. No fancy words, no confusing jargon - just simple explanations that make sense to everyone.

**Style**: Simple language, analogies, step-by-step explanations suitable for a 5-year-old

## ✨ Features

- **Three Distinct Personalities**: Each bot maintains consistent character while providing helpful responses
- **Versatile Communication**: From casual chat to serious questions, each bot adapts their style accordingly
- **Educational & Entertaining**: Learn something new or just have fun with different conversation styles
- **User-Friendly Interface**: Simple design focused on the conversation experience

## 🚀 Getting Started

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/tonetalk.git
cd tonetalk
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your API keys and configuration

4. Start the development server

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🛠️ Configuration

### Environment Variables

```env
# AI Model Configuration
AI_API_KEY=your_api_key_here
AI_MODEL=your_preferred_model

# Application Settings
PORT=5173
NODE_ENV=development
```

### Bot Personalities

Each bot is configured with specific system instructions that define their personality:

- **Gen Alpha Bot**: Responds with modern slang and internet culture references
- **Sarcastic Teenager**: Provides helpful information with attitude and sarcasm
- **ELI5 Explainer**: Breaks down complex topics into simple, understandable explanations

**Made with ❤️ for Fun conversations**
