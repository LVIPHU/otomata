import { useEffect, useState } from 'react'
import { collection, doc, getFirestore, getDocs, DocumentReference } from 'firebase/firestore'
import { createData, UserData } from './use-subscription'

interface ToolData {
  user_uids: string[]
}

interface ToolWithSubscription extends ToolData {
  id: string
  has_subbed: boolean
}

export default function useTools(updatedTime: any, firebaseApp: any, user: UserData | null) {
  let [toolsData, setToolsData] = useState<ToolWithSubscription[]>([])

  useEffect(() => {
    let queryToolsData = async () => {
      try {
        if (user) {
          let db = getFirestore(firebaseApp)
          let userRef = doc(db, 'users', user.uid)
          let userData = await createData<UserData>(userRef)
          if (userData) {
            let subscriptionIds = userData.subscription_ids.map((ref: DocumentReference) => ref.id)
            console.log('subscriptionIds', subscriptionIds)
            let toolDocs = await getDocs(collection(db, 'tools'))
            let toolsSnapshot = await Promise.all(
              toolDocs.docs.map(async (doc) => {
                let docData = doc.data() as ToolData
                return {
                  id: doc.id,
                  ...docData,
                  has_subbed: docData.user_uids.includes(user.uid)
                } as ToolWithSubscription
              })
            )
            setToolsData(toolsSnapshot)
          }
        } else {
          setToolsData([])
        }
      } catch (err) {
        console.log(err)
        setToolsData([])
      }
    }
    queryToolsData()
  }, [updatedTime, firebaseApp, user])

  return toolsData
}
