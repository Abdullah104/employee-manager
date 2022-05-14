import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebase_config'

const firebaseApp = initializeApp(firebaseConfig)

export default getFirestore(firebaseApp)
