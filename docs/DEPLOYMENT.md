# Deployment

GroceryBuddy uses Expo and EAS for building production apps.

**Quick start**: install the `eas-cli`, log in with `eas login`, then run
`eas build --platform android` or `eas build --platform ios`. For the web, run
`npx expo export --platform web` and deploy the contents of `dist/`.

## Mobile builds
1. Install the EAS CLI if you haven't already:
   ```bash
   npm install -g eas-cli
   ```
2. Authenticate with your Expo account:
   ```bash
   eas login
   ```
3. Run a build:
   ```bash
   eas build --platform android
   eas build --platform ios
   ```
   Follow the prompts to provide signing credentials.

## Web build
To generate a static web bundle run:
```bash
npx expo export --platform web
```
The contents of the `dist/` directory can then be deployed to any static hosting service.
