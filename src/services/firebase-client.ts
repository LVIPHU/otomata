import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth, browserLocalPersistence } from 'firebase/auth'
import envConfig from '@/config'

const firebaseConfig = {
  apiKey: envConfig.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envConfig.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: envConfig.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: envConfig.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: envConfig.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()

getAuth(firebaseApp)
  .setPersistence(browserLocalPersistence)
  .then((r) => r)

export { firebaseApp }
