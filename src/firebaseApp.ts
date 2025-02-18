// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

// export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// app을 사용할 때 초기화가 되어있다면 초기화되어있는 app을 가지고 오고, 아니라면 초기화하란 뜻
// import 할 때마다 initialize를 하는 것은 비효율적이기 때문
/* try {
  app = getApp("app");
} catch (e) {
  console.error("Firebase 앱을 찾을 수 없어 새로 초기화합니다:", e);
  app = initializeApp(firebaseConfig, "app");
} */

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);

// export default firebase;

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
