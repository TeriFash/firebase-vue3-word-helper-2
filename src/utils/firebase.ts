import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // connectAuthEmulator
import { getFunctions } from 'firebase/functions';
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp,
  initializeFirestore,
  // connectFirestoreEmulator,
} from 'firebase/firestore'; //Timestamp
import { firebaseConfig } from '../config/project';
import { SectionsWords } from '@/types';

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const firestoreSettings: any = {
  timestampsInSnapshots: true,
};
initializeFirestore(firebaseApp, firestoreSettings);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const projectTimeStamp = serverTimestamp;

export async function firebaseSnapshotStore(
  colName: any = 'sections'
): Promise<[] | undefined> {
  const notes: any = ref([]);

  const querySnapshot = await getDocs(collection(db, colName));
  querySnapshot.forEach((doc) => {
    notes.value.push({ id: doc.id, ...doc.data() });
  });
  await onSnapshot(collection(db, colName), (snapshot) => {
    notes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log('✅ 🧊 ~ res', snapshot);
  });
  console.log('✅ 🧊 ~ notes', notes);

  return notes;
}
export async function firebaseBdDataSetStore(
  colName: any = 'sections'
): Promise<[] | undefined> {
  try {
    const sectionsCol = collection(db, 'sections');
    const sectionsSnapshot = await getDocs(sectionsCol);
    const sectionsList: any = sectionsSnapshot.docs.map((doc) => doc.data());
    const filtered = sectionsList.filter(
      (item: any) => item?.accompanying || item?.simple || item?.rare
    );

    return { ...filtered[0] };
  } catch (error) {
    console.error('firebaseBdDataSetStore', error);
  }
}

export const useAuth = () => {
  const user = ref(auth.currentUser);
  if (process.env.NODE_ENV === 'development') {
    // connectAuthEmulator(auth, 'http://localhost:8080/');
    // enableLogging(true);
    // connectFirestoreEmulator(db, 'localhost', 8080);
  }

  return {
    user,
  };
};

// export const dataSetStore = firebaseBdDataSetStore();
export const functions = getFunctions(firebaseApp, 'asia-northeast1');
//export const functions = getFunctions(firebaseApp);
