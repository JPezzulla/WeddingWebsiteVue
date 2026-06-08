# Firebase Leaderboard Setup

This guide will help you set up Firebase Firestore for the Snake Game leaderboard.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "wedding-website-leaderboard")
4. Disable Google Analytics (optional for this use case)
5. Click "Create project"

## Step 2: Create a Firestore Database

1. In your Firebase project, click "Firestore Database" in the left menu
2. Click "Create database"
3. Choose "Start in **production mode**" (we'll add security rules next)
4. Select a region close to your users (e.g., `us-central1`)
5. Click "Enable"

## Step 3: Set Up Security Rules

1. In Firestore, go to the "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read scores
    match /snakeScores/{scoreId} {
      allow read: if true;

      // Allow writes only if:
      // - Name is a string between 1-20 chars
      // - Score is a positive number
      // - Timestamp is set by server
      allow create: if request.resource.data.name is string
                    && request.resource.data.name.size() >= 1
                    && request.resource.data.name.size() <= 20
                    && request.resource.data.score is number
                    && request.resource.data.score >= 0
                    && request.resource.data.score < 10000
                    && request.resource.data.timestamp == request.time;

      // No updates or deletes allowed
      allow update, delete: if false;
    }
  }
}
```

3. Click "Publish"

## Step 4: Get Your Firebase Config

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app with a nickname (e.g., "Wedding Website")
6. Copy the `firebaseConfig` object values

## Step 5: Add Environment Variables

1. Create a `.env.local` file in your project root (or add to existing `.env`)
2. Add your Firebase config:

```bash
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 6: Add to GitHub Secrets (for deployment)

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret" for each variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## Step 7: Update GitHub Actions Workflow

Your workflow file should already pass environment variables. Verify it includes:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
  VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
  VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
  VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
```

## Testing Locally

1. Restart your dev server after adding `.env.local`
2. Play the snake game (press Konami code: ↑↑↓↓←→←→BA)
3. When game ends, submit a score
4. Check Firebase Console → Firestore Database to see the new entry

## Security Notes

✅ **These security rules prevent:**
- Score tampering (scores must be between 0-10000)
- Name spam (names limited to 20 characters)
- Malicious updates/deletes
- Server timestamp manipulation

✅ **Safe to expose:** Firebase API keys are safe in client-side code when you have proper security rules

## Free Tier Limits

Firebase free tier ("Spark Plan") includes:
- **Storage:** 1 GB
- **Reads:** 50,000/day
- **Writes:** 20,000/day
- **Deletes:** 20,000/day

For a wedding website with ~100-200 guests, this is more than enough!

## Monitoring Usage

1. Go to Firebase Console
2. Click "Usage" in the left menu
3. Monitor your Firestore reads/writes

## Troubleshooting

**Error: "Missing or insufficient permissions"**
- Check that security rules are published
- Verify rules allow both read and create operations

**Scores not appearing**
- Check browser console for errors
- Verify all environment variables are set correctly
- Check Firebase Console → Firestore to see if data is being written

**Local development shows "Failed to load leaderboard"**
- Ensure `.env.local` file exists
- Restart dev server after creating/modifying `.env.local`
- Check that all `VITE_FIREBASE_*` variables are set
