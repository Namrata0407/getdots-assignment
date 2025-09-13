# [Dots Search Interface](https://dots-app-ten.vercel.app/)

A modern, responsive search interface built with React.js that features smooth animations, dynamic filtering, and a beautiful UI.

## Features

- 👋 Interactive onboarding experience for first-time users
- 🔍 Real-time search with dynamic results filtering
- 🎯 Multiple result types (files, people, folders, videos)
- 🎨 Clean and modern UI with smooth animations
- 💡 Smart status indicators (active, away, unactivated)
- ⚙️ Configurable content filters via settings menu
- 📱 Fully responsive design (desktop, tablet, mobile)
- ⌨️ Keyboard shortcut hint ('S' for quick access)
- 🔄 Loading states with animated indicators
- 🖱️ Custom cursor implementation
- 🔗 Quick actions (copy link, open in new tab)

## Key UI/UX Features
- First-time user onboarding with helpful tips and examples
- Session-based onboarding that remembers returning users
- Smooth modal transitions and animations
- Dynamic tab filtering system
- Real-time search feedback
- Interactive hover states
- Status indicators with color coding
- Custom loading spinners
- Intuitive settings interface

## User Experience

### First-Time User Onboarding
When users first visit the application, they are greeted with a welcoming onboarding screen that:
- Introduces the main features and capabilities
- Provides examples of different search types (files, people, chats, lists)
- Shows quick tips for efficient usage
- Features a "Got it!" button to dismiss the guide
- Remembers user preference using session storage

The onboarding experience is designed to be:
- Non-intrusive (can be dismissed easily)
- Informative yet concise
- Visually appealing with a modern glass-morphism design
- Session-based (shows again in new browser sessions)

## Onboarding Page
<img width="500" height="443" alt="Screenshot 2025-09-11 144902" src="https://github.com/user-attachments/assets/72af754d-c5bb-4063-af30-bd52899671b9" />

## Search UI
<img width="497" height="560" alt="Screenshot 2025-09-11 145911" src="https://github.com/user-attachments/assets/e0bcb17c-2b2e-4f53-9586-7f483748bf54" />

## Setting Popup
<img width="438" height="529" alt="Screenshot 2025-09-11 145928" src="https://github.com/user-attachments/assets/90923023-a722-48d7-8989-8339d73976ce" />

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Namrata0407/getdots-assignment.git
   cd dots-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Project Structure

```
dots-app/
├── src/
│   ├── components/
│   │   ├── OnboardingScreen/
│   │   ├── SearchBar/
│   │   ├── TabNavigation/
│   │   ├── SearchResults/
│   │   ├── ResultItem/
│   │   ├── SettingsMenu/
│   │   ├── ToggleSwitch/
│   │   └── CustomCursor/
│   ├── App.jsx
│   ├── App.css
│   └── mockData.js
```

## Technologies Used

- React.js
- CSS3 with modern features
- Vite for build tooling
- Custom SVG icons
- CSS animations and transitions

## Design Decisions

- No UI component libraries used (built from scratch)
- Custom implementations for all interactive elements
- Semantic HTML structure
- Responsive design principles
- Accessibility considerations
- Performance optimizations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

This project was built as part of a frontend development assignment, focusing on:
- Visual judgment and design intuition
- Frontend development experience
- UI/UX implementation skills
- Attention to detail in animations and transitions
