# YourCall 🎥🎙️

A unified platform combining YouTube and Discord - video sharing meets community communication.

## 🌟 Features

### Video Sharing (YouTube-like)
- 📹 Upload and stream MP4/WebM videos
- 🎬 Video library and discovery
- ⭐ Like, comment, and share functionality
- 📊 View counters and analytics

### Community & Communication (Discord-like)
- 🗣️ Dedicated channels per server
- 💬 Real-time text chat with overlays
- 🎤 Voice calls and communication
- 👥 Community server management

### Together Watching
- 👨‍👩‍👧‍👦 Watch videos together in channels
- 💬 Live chat overlay during viewing
- 🔔 Notifications for new content
- 📺 Synchronized playback

### Moderation & Safety
- 🛡️ Moderation tools and permissions
- 👮 User management and roles
- 🚫 Content filtering and controls
- 📋 Activity logs

### Cross-Platform
- 🌐 Web application
- 📱 Mobile-responsive design
- 📦 Android APK support
- 🍎 iOS support (future)

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 18+ / React Native
- **State Management:** Redux Toolkit / Zustand
- **Styling:** Tailwind CSS / Material-UI
- **Real-time:** WebSocket / Socket.io
- **Video Player:** HLS.js / Video.js
- **Mobile:** React Native / Expo

### Backend
- **Runtime:** Node.js with Express.js
- **Database:** PostgreSQL + Redis
- **File Storage:** MinIO / AWS S3
- **Real-time:** Socket.io
- **Authentication:** JWT + OAuth2
- **Video Processing:** FFmpeg
- **API:** REST + GraphQL

### Infrastructure
- **Containerization:** Docker
- **Orchestration:** Docker Compose / Kubernetes
- **CI/CD:** GitHub Actions
- **Hosting:** Self-hosted or Cloud (AWS/GCP/DigitalOcean)

## 📁 Project Structure

```
YourCall/
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── servers/
│   │   ├── channels/
│   │   ├── videos/
│   │   ├── chat/
│   │   ├── voice/
│   │   └── middleware/
│   ├── config/
│   ├── docker/
│   └── package.json
├── frontend/
│   ├── web/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   └── mobile/
│       ├── src/
│       ├── android/
│       └── package.json
├── docs/
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 6+
- FFmpeg

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Cyber39Dream/YourCall.git
   cd YourCall
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the platform**
   - Web: http://localhost:3000
   - API: http://localhost:5000
   - WebSocket: ws://localhost:5000

## 🎯 Development Roadmap

### Phase 1: Core Infrastructure
- [ ] Backend API setup
- [ ] Database schema
- [ ] Authentication system
- [ ] User management

### Phase 2: Video Features
- [ ] Video upload system
- [ ] Video processing pipeline
- [ ] Streaming infrastructure
- [ ] Video player

### Phase 3: Community Features
- [ ] Server creation
- [ ] Channel management
- [ ] Text chat system
- [ ] User roles & permissions

### Phase 4: Real-time Communication
- [ ] Voice calls
- [ ] WebSocket setup
- [ ] Chat overlay
- [ ] Notifications

### Phase 5: Frontend Development
- [ ] Web UI (React)
- [ ] Mobile app (React Native)
- [ ] Responsive design
- [ ] Android APK build

### Phase 6: Advanced Features
- [ ] Moderation tools
- [ ] Analytics dashboard
- [ ] Search & discovery
- [ ] Recommendations

### Phase 7: Deployment & Scale
- [ ] CI/CD setup
- [ ] Docker containerization
- [ ] Load balancing
- [ ] Performance optimization

## 📝 API Documentation

Coming soon! See `/docs` for detailed API specifications.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 💬 Support

Have questions or issues? Open a GitHub issue or contact us.

---

**Made with ❤️ by Cyber39Dream**
