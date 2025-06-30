# TeeParty

A unified digital platform bringing the entire golfing experience together in one place.

🏌️ Project Overview
As a golfer, I identified a significant gap in the current digital golf landscape. Players are forced to juggle multiple apps to connect with other golfers, book tee times, read course reviews, and manage their gameplay. This fragmented experience creates unnecessary friction and missed opportunities for community building.
TeeParty solves this problem by providing a comprehensive, one-stop solution where golfers can:

Discover and book tee times
Connect with fellow players
Share and read course reviews
Build meaningful golfing networks
Manage their entire golf experience seamlessly

✨ Key Features
🎯 Tee Time Management

Browse available tee times across multiple courses
Real-time booking system with instant confirmation
Personal booking history and upcoming reservations

👥 Player Networking

Connect with golfers in your area
Create and join golf groups
Find playing partners based on skill level and availability

⭐ Course Reviews & Discovery

Comprehensive course database
User-generated reviews and ratings
Photo sharing and course condition updates

📱 Unified Experience

Single platform eliminating the need for multiple golf apps
Streamlined user interface designed for golfers
Cross-platform compatibility

🛠️ Technology Stack
Frontend:

React (Latest Version)
JavaScript (ES6+)
CSS3 (Vanilla CSS)
Bootstrap 5
Vite (Build Tool)

Backend/Data:

Local JSON Database
Node.js (for API server)

Development Tools:

ESLint (Code linting)
Git (Version control)
Modern browser compatibility

Architecture:

Single Page Application (SPA)
Component-based architecture
Local API with JSON database
Client-server separation

🚀 Getting Started
Prerequisites

Node.js (Latest LTS version - 18.x or higher)
npm (comes with Node.js)
Modern web browser
Git for version control

Installation

Clone the repository

bashgit clone https://github.com/dwest1220/TeeParty.git
cd TeeParty

Install dependencies for both client and API

bash# Install frontend dependencies
npm install

# Install API dependencies
cd API
npm install
cd ..

Start both servers

bash# Terminal 1: Start the API server
cd API
npm start

# Terminal 2: Start the frontend development server
npm run dev
The application will be available at http://localhost:5173 (Vite default port).

Dashboard View: Overview of upcoming tee times and activity
Course Discovery: Browse and search golf courses
Booking Interface: Streamlined tee time reservation
Player Network: Connect with other golfers

🎯 User Stories
Core Functionality

As a golfer, I want to book tee times without switching between multiple apps
As a social golfer, I want to find playing partners with similar skill levels
As a course researcher, I want to read authentic reviews before booking
As a golf community member, I want to share my experiences and connect with others

Advanced Features

As a frequent player, I want to track my booking history and preferences
As a group organizer, I want to coordinate golf outings with multiple players
As a course reviewer, I want to share photos and detailed course conditions

🔧 Development
Project Structure
CLIENT (Frontend):
TeeParty/
├── components/           # Reusable React components
├── public/              # Static assets and files
├── services/            # API calls and data services
├── src/                 # Main source code
├── .gitignore          # Git ignore file
├── eslint.config.js    # ESLint configuration
├── index.html          # Main HTML file
├── package.json        # Dependencies and scripts
├── package-lock.json   # Dependency lock file
└── vite.config.js      # Vite build configuration
API (Backend Data):
API/
├── node_modules/       # Backend dependencies
├── database.json       # Local JSON database
├── package.json        # Backend package configuration
└── package-lock.json   # Backend dependency lock file
Available Scripts
Frontend (CLIENT):

npm run dev - Runs the development server with Vite
npm run build - Builds the app for production
npm run preview - Preview the production build locally
npm run lint - Run ESLint for code quality

Backend (API):

npm start - Starts the local JSON database server
npm run dev - Runs the API in development mode

🧪 Testing
This project uses React's built-in testing utilities with Jest and React Testing Library.
Run tests with:
bashnpm test
🚀 Deployment
This frontend-only application can be deployed to any static hosting service:
Recommended platforms:

Netlify
Vercel
GitHub Pages
Firebase Hosting

Build for production:
bashnpm run build
This creates an optimized build in the build folder ready for deployment.
🤝 Contributing
This is a capstone project, but feedback and suggestions are welcome!

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📝 Future Enhancements

Mobile App: Native iOS and Android applications
GPS Integration: Location-based course recommendations
Weather Integration: Real-time weather conditions for courses
Handicap Tracking: Integrated scoring and handicap management
Tournament Organization: Tools for organizing golf tournaments
Pro Shop Integration: Direct merchandise and equipment purchasing

📄 License
This project is licensed under the MIT License.
👨‍💻 About the Developer
This project was developed as a frontend capstone project, addressing a real problem I experienced as an active golfer. The goal was to create a unified platform that eliminates the friction of using multiple golf apps and strengthens the golfing community.
Connect with me:

GitHub: @dwest1220
LinkedIn: https://www.linkedin.com/in/david-west-a205a8274/
Email: davidwestsoftdev@gmail.com

🙏 Acknowledgments

Vite team for the fast build tool and development experience
Create React App for inspiring the project structure
Bootstrap team for the responsive UI framework
The golf community for inspiring this project


⛳ Happy Golfing! ⛳
