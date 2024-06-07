'use client'
import * as React from 'react'
import useFirebaseAuth from '@/hooks/use-firebase-auth'
import { ReactNode, useContext } from 'react'

const FirebaseContext = React.createContext<any>(null)

type Props = {
  children: ReactNode
}

export default function FirebaseAuthProvider({ children }: Props) {
  const { firebaseApp, auth, user, loading } = useFirebaseAuth()
  return <FirebaseContext.Provider value={{ firebaseApp, auth, user }}>{children} </FirebaseContext.Provider>
}

export function useFirebaseContext() {
  return useContext(FirebaseContext)
}
