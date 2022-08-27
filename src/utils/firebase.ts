import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  serverTimestamp,
  initializeFirestore,
  connectFirestoreEmulator,
} from 'firebase/firestore'; //Timestamp
import { enableLogging } from 'firebase/database';
import { firebaseConfig } from '../config/project';

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const firestoreSettings: any = {
  timestampsInSnapshots: true,
};
initializeFirestore(firebaseApp, firestoreSettings);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const projectTimeStamp = serverTimestamp;
// eslint-disable-next-line @typescript-eslint/ban-types
export async function firestore(): Promise<[] | undefined> {
  const { settings }: any = await getFirestore(firebaseApp);
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:8080/');
  }
  return settings;
}
export async function firebaseSnapshotStore(): Promise<[] | undefined> {
  const notes: any = ref([]);

  const querySnapshot = await getDocs(collection(db, 'simple'));
  querySnapshot.forEach((doc) => {
    notes.value.push({ id: doc.id, ...doc.data() });
  });
  const res = await onSnapshot(collection(db, `simple`), (snapshot) => {
    notes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  console.log('✅ 🧊 ~ res', res);

  return notes;
}
export async function firebaseBdDataSetStore(): Promise<[] | undefined> {
  try {
    const sectionsCol = collection(db, 'sections');
    const sectionsSnapshot = await getDocs(sectionsCol);

    // const noteDate = Timestamp.fromDate(new Date());
    const sectionsList: any = sectionsSnapshot.docs.map((doc) => doc.data());
    const filtered = sectionsList.filter(
      (item: any) => item?.accompanying || item?.simple || item?.rare
    );

    return filtered[0];
  } catch (error) {
    console.error('firebaseBdDataSetStore', error);
  }
}

if (location.hostname === 'localhost') {
  enableLogging(true);
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export const useAuth = async () => {
  if (process.env.NODE_ENV === 'development') {
    // db.settings({ host: 'localhost:8080', ssl: false });
    // firebase.auth().useEmulator('http://localhost:9099/');
    connectAuthEmulator(auth, 'http://localhost:8080/');
  }
  const { currentUser } = auth;
  console.log('✅ 🧊 ~ user', currentUser);

  return {
    user: currentUser,
  };
};

export const useFirestore = () => {
  return {
    db,
  };
};

// export const dataSetStore = firebaseBdDataSetStore();
export const functions = getFunctions(firebaseApp, 'asia-northeast1');
//export const functions = getFunctions(firebaseApp);
