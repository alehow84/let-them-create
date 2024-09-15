/*
-Add SDKs for Firebase products I want to use
-Add my web apps firebase configurations
-Initialise Firebase
 */
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESS_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

//Initialise firebase if not already initialised
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

//export the things i need
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();

/*
-create userProfile page
-import ProtectedRoute, useAuth, useRouter into user-signup, user-login, user-profile
- 
-Create Authcontext and AuthContextProvider

*/
