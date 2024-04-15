import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCgRCpFP8m1SjIUqgQXUvtvMyWDdISp90Q',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'automate-pvs-task.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'automate-pvs-task',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'automate-pvs-task.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '321693495793',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:321693495793:web:0e49a4b15386e8eb57d450',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-GKDWWRCBJ4'
}

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

getAuth(firebaseApp).setPersistence(browserLocalPersistence)

export { firebaseApp }
