<div align="center">

# ⚡ MeetSync AI
### Autonomous Meeting Infrastructure & Real-Time Intelligence

**Created & Engineered by [Ziane Souhayl](https://github.com/ZiSouha)**

[![GitHub](https://img.shields.io/badge/GitHub-ZiSouha-181717?style=for-the-badge&logo=github)](https://github.com/ZiSouha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ziane_Souhayl-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ziane-souhayl)
[![Email](https://img.shields.io/badge/Email-zianesouhayl%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:zianesouhayl@gmail.com)

<p align="center">
  <em>The intelligent layer for next-generation meetings — join meetings with your own AI agents, record real-time audio with speaker diarization, and generate contextual action items autonomously.</em>
</p>

---

</div>

## 👨‍💻 Author & Creator

- **Developer:** **Ziane Souhayl**
- **GitHub:** [@ZiSouha](https://github.com/ZiSouha)
- **LinkedIn:** [linkedin.com/in/ziane-souhayl](https://www.linkedin.com/in/ziane-souhayl)
- **Email:** [zianesouhayl@gmail.com](mailto:zianesouhayl@gmail.com)

---

## 🚀 Key Features

- 🤖 **Autonomous AI Meeting Agents**: Deploy AI bots into your live meetings that listen, comprehend context, and actively generate structured summaries.
- 🎙️ **Real-Time WebRTC Audio & Video**: Ultra-low latency streaming powered by Stream Video SDK.
- 📝 **Live Transcripts & Speaker Diarization**: High-precision speech-to-text with multi-speaker identification and timeline alignment.
- ⚡ **Background Agent Execution**: Event-driven background tasks orchestrated via Inngest and AgentKit.
- 🔐 **Robust Authentication**: Email/password, Google OAuth, and GitHub OAuth powered by Better Auth.
- 💎 **Modern Dark Theme & Micro-Interactions**: Built with Tailwind CSS, Framer Motion, and Radix UI primitives.
- 📊 **Type-Safe Full-Stack RPC**: End-to-end type safety with tRPC and Drizzle ORM on PostgreSQL (Neon).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Database & ORM**: PostgreSQL, Drizzle ORM, Neon Serverless
- **AI / LLM Integration**: Google Gemini API, OpenAI Realtime, Inngest Agent Kit
- **Audio & Video**: Stream Video React SDK (`@stream-io/video-react-sdk`)
- **API & RPC**: tRPC v11, TanStack React Query v5
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS, Framer Motion, Lucide Icons, React Icons

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- PostgreSQL database URL (Neon or local)
- API keys: Stream Video, Google Gemini / OpenAI, Inngest

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ZiSouha/MeetSyncAi-Web.git
   cd MeetSyncAi-Web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgres_database_url
   BETTER_AUTH_SECRET=your_auth_secret
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your_stream_api_key
   STREAM_VIDEO_SECRET_KEY=your_stream_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Push database schema:**
   ```bash
   npm run db:push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Contact & Connect

Feel free to connect or reach out for collaboration, questions, or opportunities:

- **Ziane Souhayl**
- Email: [zianesouhayl@gmail.com](mailto:zianesouhayl@gmail.com)
- GitHub: [https://github.com/ZiSouha](https://github.com/ZiSouha)
- LinkedIn: [https://www.linkedin.com/in/ziane-souhayl](https://www.linkedin.com/in/ziane-souhayl)

---

<p align="center">
  <sub>© 2026 MeetSync AI. Created with ❤️ by <strong>Ziane Souhayl</strong>. All rights reserved.</sub>
</p>
