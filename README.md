# Notes App — React Native (Expo)

A notes-taking mobile app built with React Native + Expo.  
Pure black OLED theme. Uses the [Self-Hosted PHP REST API](https://github.com/Guruprasanth-M/API-dev) for auth and data.

---

## Features

- Signup & Login (email verification)
- Folders — create, list, delete
- Notes — create, edit, delete inside folders
- Auto token refresh (OAuth-style)
- Pull to refresh
- Pure black OLED theme

---

## Project Structure

```
notes-app/
├── App.js                    # Root — navigation + auth
├── src/
│   ├── api.js                # All API calls
│   ├── AuthContext.js         # Auth state + token refresh
│   └── screens/
│       ├── LoginScreen.js
│       ├── SignupScreen.js
│       ├── FoldersScreen.js
│       ├── NotesScreen.js
│       └── EditorScreen.js
├── app.json                  # Expo config
├── eas.json                  # Build config (APK)
├── babel.config.js
└── package.json
```

---

## Run on Phone (Development)

### What you need
- Node.js v18+ installed on your computer
- **Expo Go** app installed on your phone (free from Play Store / App Store)
- Both phone and computer on the **same WiFi**

### Steps

```bash
cd notes-app
npm install
npm start
```

A QR code appears in your terminal.

- **Android** → Open Expo Go app → Tap "Scan QR code" → Scan it
- **iPhone** → Open Camera app → Point at QR code → Tap the Expo link

The app loads on your phone instantly. No build needed.

---

## Build APK & Install on Android

This is how you get an actual `.apk` file you can install on any Android phone — like a real app.

### Step 1: Create Expo Account (free, one time)

Go to https://expo.dev/signup and create a free account.

### Step 2: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 3: Login to Expo

```bash
eas login
```

Enter the username and password from Step 1.

### Step 4: Build the APK

```bash
cd notes-app
eas build --platform android --profile preview
```

- First time it will ask: **"Generate a new Android Keystore?"** → Type `y` and press Enter
- EAS uploads your code and builds the APK in the cloud
- Takes about **10-15 minutes**
- When done, it gives you a **download URL**

### Step 5: Download & Install

1. Copy the download URL that EAS gave you
2. Open that URL **on your Android phone** in Chrome
3. Download the `.apk` file
4. Tap the downloaded file
5. If it says "Install from unknown sources" → go to Settings → tap Allow → come back and tap Install
6. Done — the app is on your phone

### Alternative: Send APK via WhatsApp/Telegram

1. Download the APK on your computer from the EAS URL
2. Send it to yourself on WhatsApp or Telegram
3. Open it on your phone and install

---

## Build for iOS

Requires an **Apple Developer Account** ($99/year).

```bash
eas build --platform ios --profile preview
```

Install via TestFlight.

---

## Configuration

Copy `.env.sample` to `.env` and configure your API backend URL.

---

## Author

**Guruprasanth M**
