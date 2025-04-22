
# ⚽ Soccer Betting Pool Application

A modern web application for creating and participating in soccer betting pools with friends. Built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### For Users
- **Live Match Tracking**: Follow soccer matches across multiple leagues in real-time
- **Betting Pools**: Join pools across Premier League, La Liga, Bundesliga, and Serie A
- **Score Predictions**: Make predictions for upcoming matches
- **Virtual Wallet**: Manage your funds for entering pools and receiving winnings
- **Leaderboards**: Track your performance against other players
- **Transaction History**: View your complete betting history

### For Administrators
- Pool Management: Create and manage betting pools
- User Management: Overview of user activities and transactions
- Match Management: Update match statuses and scores

## 💻 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: @tanstack/react-query
- **Routing**: React Router DOM
- **Charts & Visualizations**: Recharts
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd soccer-betting
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📱 Application Structure

### Pages
- **Home**: Featured pools and leaderboards
- **Pools**: Browse and join betting pools
- **Pool Detail**: View specific pool information and make predictions
- **Leaderboards**: Global and pool-specific rankings
- **Profile**: User information and settings
- **Wallet**: Manage virtual currency and transaction history

### Key Components
- **MatchPredictionCard**: Make predictions for individual matches
- **PoolCard**: Display pool information and entry details
- **LeaderboardTable**: Show user rankings and scores
- **WalletCard**: Display user balance and quick actions
- **TransactionHistoryTable**: List of user's financial activities

## 🎮 How to Play

1. **Create an Account**: Register with your email and password
2. **Add Funds**: Deposit virtual currency to your wallet
3. **Join a Pool**: Browse available pools and pay entry fee to join
4. **Make Predictions**: Submit your score predictions for matches
5. **Track Progress**: Monitor your predictions and standings
6. **Collect Winnings**: Receive payouts for successful predictions

## 📝 Scoring System

- **Correct Score**: 5 points
- **Correct Outcome & Goal Difference**: 3 points
- **Correct Outcome Only**: 2 points

## 🔒 Security Features

- Secure authentication system
- Protected API endpoints
- Input validation and sanitization
- Session management
- Secure wallet transactions

## 🛠️ Development

### Code Organization
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/          # Utilities and helpers
├── pages/        # Route components
└── types/        # TypeScript definitions
```

### Key Files
- `src/lib/auth.ts`: Authentication logic
- `src/lib/mockData.ts`: Development data
- `src/types/index.ts`: TypeScript interfaces
- `src/lib/utils.ts`: Helper functions

### Styling
- Tailwind CSS for utility-first styling
- Custom animations and transitions
- Responsive design for all screen sizes
- Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

