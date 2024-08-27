import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged as onAuthStateChangedFirebase,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvAMilWb6MWuNulzfVhMUMmJ5DimEj4vg',
  authDomain: 'sistema-de-compras-dcd0e.firebaseapp.com',
  projectId: 'sistema-de-compras-dcd0e',
  storageBucket: 'sistema-de-compras-dcd0e.appspot.com',
  messagingSenderId: '1008500472531',
  appId: '1:1008500472531:web:e81d0e103fcd8117867226',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const onAuthStateChanged = onAuthStateChangedFirebase;

const setAdminUser = async () => {
  const userId = 'EXUEd8FB1mSozYpWGSRrFwbhDfj2';
  const userDocRef = doc(db, 'users', userId);
  try {
    await setDoc(userDocRef, {
      email: 'admin@gmail.com',
      isAdmin: true,
    });
  } catch (error) {
    console.error('Erro ao definir usuário admin:', error);
  }
};

setAdminUser();
