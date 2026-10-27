
import { initializeApp } from "firebase/app"; 
import {getAuth,GoogleAuthProvider} from 'firebase/auth'; 
import {getStorage} from 'firebase/storage';
import {getFirestore,collection,getDocs,addDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdjvUTwaKT4WzoJJlc0mpcYd6FyreB_a4",
  authDomain: "olx-clone-443b0.firebaseapp.com",
  projectId: "olx-clone-443b0", 
  storageBucket: "olx-clone-443b0.firebasestorage.app",
  messagingSenderId: "63864253330",
  appId: "1:63864253330:web:29f1ff995bd809c7652f4b"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app) 
const provider = new GoogleAuthProvider()
const storage = getStorage() 
const fireStore = getFirestore()

const fetchFromFirestore = async()=>{
  try{
    const productsCollection = collection(fireStore,'products') 
    const productSnapshot = await getDocs(productsCollection)
    const productList = productSnapshot.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    })) 
    console.log('Fetched products from Firestore',productList)
    return productList
  }catch(error){
    console.error('Error fetching products from Firestore:',error)
    return []
  }
} 

export {
  auth,
  provider,
  storage,
  fireStore,
  fetchFromFirestore
}