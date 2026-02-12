# 📝 Notes App — React Native (Expo)

A beautiful Apple Notes-inspired mobile app built with React Native + Expo.  
Features a stunning dark OLED theme with yellow accents. Uses the [Self-Hosted PHP REST API](https://github.com/Guruprasanth-M/API-dev) for authentication and data.

> **Version:** `1.0.1`  
> **Platform:** Android (iOS ready)  
> **Backend:** [API-dev](https://github.com/Guruprasanth-M/API-dev)

---

## ✨ Features (v1)

### Authentication
- User signup with email verification
- Login with username/email
- Password reset flow
- Auto token refresh (OAuth-style)
- Secure session management

### Notes Management
- Create, organize, and manage folders
- Create, edit, and delete notes
- Search notes and folders
- Pull to refresh
- Haptic feedback

### UI/UX
- Apple Notes-inspired design
- Pure black OLED theme
- Yellow accent colors
- iOS-style navigation
- Empty states with illustrations
- Profile screen with stats

---

## 📱 Screenshots
<img width="1920" height="1080" alt="Screen shot" src="https://github.com/user-attachments/assets/1cc7a42f-86b7-4273-9b2c-5d02a9ce88aa" />


---

## 🗂️ Project Structure

```
notes-app/
├── App.js                    # Root — navigation + auth
├── src/
│   ├── api.js                # All API calls
│   ├── AuthContext.js        # Auth state + token refresh
│   ├── alertHelper.js        # Cross-platform alerts
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── VerifyScreen.js
│   │   ├── ResetScreen.js
│   │   ├── FoldersScreen.js
│   │   ├── NotesScreen.js
│   │   ├── EditorScreen.js
│   │   └── ProfileScreen.js
│   └── styles/
│       ├── common.styles.js      # Design system
│       ├── authScreens.styles.js
│       ├── foldersScreen.styles.js
│       ├── notesScreen.styles.js
│       └── editorScreen.styles.js
├── app.json                  # Expo config
├── eas.json                  # Build config (APK)
└── package.json
```

---

## 🚀 Run on Phone (Development)

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

## 🗺️ Roadmap

### v2 — Enhanced Features (Coming Soon)
- [ ] **Profile Management** — Edit username, email, password
- [ ] **Voice Notes** — Record and attach audio to notes
- [ ] **Note Sharing** — Share notes with other users
- [ ] **AI Integration** — Smart suggestions, auto-formatting, summarization
- [ ] **Rich Text Editor** — Bold, italic, lists, checkboxes
- [ ] **Note Attachments** — Images and file attachments
- [ ] **Tags & Labels** — Organize notes with tags
- [ ] **Dark/Light Theme Toggle**
- [ ] **Offline Mode** — Create notes without internet, sync later
- [ ] **Backend Migration** — Node.js/Python (FastAPI) for better performance

### v3 — Community Platform (Future)
- [ ] **Public Notes** — Share notes publicly
- [ ] **User Profiles** — Follow other users
- [ ] **Collaborative Editing** — Real-time collaboration
- [ ] **Comments & Reactions**
- [ ] **Note Templates**
- [ ] **API Rate Limiting & Analytics**
- [ ] **Admin Dashboard**

---

## 🔗 Other Projects

Check out my other projects:

| Project | Description | Link |
|---------|-------------|------|
| **API-dev** | Self-hosted PHP REST API for authentication | [GitHub](https://github.com/Guruprasanth-M/API-dev) |
| **Notes App** | This React Native app | [GitHub](https://github.com/Guruprasanth-M/Note_APP) |

---

## 👨‍💻 Author

**Guruprasanth M**  
Building real systems, learning by doing.

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
