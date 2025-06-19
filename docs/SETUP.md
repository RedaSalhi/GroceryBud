# Setup

Follow these steps to run GroceryBuddy locally.

**Quick start**: clone the repo, run `npm install`, copy `.env.example` to `.env`,
update the Firebase credentials in `src/services/firebase/config.js` and run
`npx expo start`.

## Prerequisites
- [Node.js](https://nodejs.org/) 18 or higher
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (`npm install -g expo-cli`)
- A Firebase project (Firestore and Storage enabled)

## Steps
1. Clone the repository and install dependencies:
   ```bash
   git clone <REPO_URL>
   cd grocerybuddy
   npm install
   ```
2. Copy the example environment file and update your Firebase credentials:
   ```bash
   cp .env.example .env
   # edit src/services/firebase/config.js
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
   Use the on-screen prompts to run the app on Android, iOS or the web.
