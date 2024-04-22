import { useEffect, useState } from 'react'
import { firebaseApp } from '@/services/firebase-client'
import { getAuth, getIdToken, User } from 'firebase/auth'
import nookies from 'nookies'

export default function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  let auth = getAuth(firebaseApp)

  useEffect(() => {
    const onTokenChange = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user)
        let token = await getIdToken(user)
        nookies.set(undefined, 'token', token, {
          path: '/',
          maxAge: 86400 * 1000
        })
      } else {
        setUser(null)
        nookies.set(undefined, 'token', '', {
          path: '/'
        })
      }
      setLoading(false)
    })
    return () => {
      onTokenChange()
      setLoading(false)
    }
  }, [auth, loading])

  return { firebaseApp, auth, user, loading }
}
