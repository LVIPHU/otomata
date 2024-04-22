import { useEffect, useState } from 'react'
import { doc, DocumentData, DocumentReference, Firestore, getDoc, getFirestore } from 'firebase/firestore'
import { FirebaseApp } from '@firebase/app'

enum GET_RULES {
  GET_ONE = 'GET_ONE',
  GET_ALL = 'GET_ALL'
}

export interface UserData {
  uid: string
  subscription_ids: DocumentReference[]
}

interface ToolData {
  domain: string
  name: string
}

interface SubscriptionData {
  tool_id: DocumentReference
  runs: number
}

interface Subscription {
  ref: DocumentReference<DocumentData, DocumentData>
  domain: string
  name: string
  runs: number
}

export const createData = async <T>(docRef: DocumentReference): Promise<T | null> => {
  try {
    let docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      return docSnapshot.data() as T
    } else {
      return null
    }
  } catch {
    return null
  }
}

export const getSubscriptionData = async (
  userData: UserData,
  domain: string | null = null
): Promise<Subscription | Subscription[] | null> => {
  try {
    if (userData) {
      if (domain) {
        // Initial value as a resolved promise
        return await userData.subscription_ids.reduce(async (accPromise, ref) => {
          const acc = await accPromise // Resolve the previous accumulator promise
          let subscriptionData = await createData<SubscriptionData>(ref)
          if (subscriptionData) {
            let toolData = await createData<ToolData>(subscriptionData.tool_id)
            if (toolData && toolData.domain === domain) {
              return {
                ref,
                domain: toolData.domain,
                name: toolData.name,
                runs: subscriptionData.runs
              }
            }
          }
          return acc // Return previous accumulator if conditions not met
        }, Promise.resolve<Subscription | null>(null))
      } else {
        const subscriptionRefs = await Promise.all(
          userData.subscription_ids.map(async (ref) => {
            let subscriptionData = await createData<SubscriptionData>(ref)
            if (subscriptionData) {
              let toolData = await createData<ToolData>(subscriptionData.tool_id)
              return {
                ref,
                domain: toolData?.domain,
                name: toolData?.name,
                runs: subscriptionData.runs
              }
            }
            return null
          })
        )
        return subscriptionRefs.filter((sub): sub is Subscription => sub !== null)
      }
    } else return null
  } catch (err) {
    // @ts-ignore
    throw new Error(err.message)
  }
}

interface SubscriptionHookProps {
  rule?: GET_RULES
  user: UserData | null
  firebaseApp: FirebaseApp
  updatedTime?: number | null
}

interface SubscriptionState {
  ref: DocumentReference | null
  domain: string | null
  name?: string
  runs: number | null
}

export default function useSubscription({
  rule = GET_RULES.GET_ONE,
  user,
  firebaseApp,
  updatedTime = null
}: SubscriptionHookProps) {
  let [subData, setSubData] = useState<SubscriptionState>({ ref: null, domain: null, name: undefined, runs: null })
  useEffect(
    () => {
      let populateSubData = async () => {
        try {
          if (user) {
            let db: Firestore = getFirestore(firebaseApp)
            let userRef = doc(db, 'users', user.uid)
            let userData = await createData<UserData>(userRef)
            if (userData) {
              if (rule === GET_RULES.GET_ALL) {
                const data = await getSubscriptionData(userData)
                if (Array.isArray(data)) {
                  setSubData({ ...subData, ...data[0] }) // Assuming you want to display the first subscription, modify as needed
                }
              } else {
                const result = await getSubscriptionData(userData, window.location.href)
                if (result && 'ref' in result) {
                  const { ref, domain, name, runs } = result
                  setSubData({ ref, domain, name, runs })
                }
              }
            }
          } else {
            setSubData({ ref: null, domain: null, name: undefined, runs: null })
          }
        } catch (err) {
          console.log(err)
        }
      }
      populateSubData().then((r) => r)
    },
    updatedTime ? [user, updatedTime] : [user]
  )

  return [subData, setSubData]
}
