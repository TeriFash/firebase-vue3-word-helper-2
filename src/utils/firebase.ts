import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // connectAuthEmulator
import { getFunctions } from 'firebase/functions';
import { ref, Ref } from 'vue';
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  doc,
  serverTimestamp,
  initializeFirestore,
  updateDoc,
  arrayUnion,
  // connectFirestoreEmulator,
} from 'firebase/firestore';
import { firebaseConfig } from '../config/project';
import { FIRESTORE, FIRESTORE_COLLECTION } from '@/types';

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const firestoreSettings: any = {
  timestampsInSnapshots: true,
};
initializeFirestore(firebaseApp, firestoreSettings);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const projectTimeStamp = serverTimestamp;

export async function firebaseRunTransaction(update: any, fild: any) {
  // const batch = writeBatch(db);

  try {
    const ref = doc(collection(db, FIRESTORE.simple), 'ua');

    await updateDoc(ref, {
      [fild]: update,
    });

    // await runTransaction(db, async (transaction) => {
    //   const sfDoc = await transaction.get(ref);
    //   if (!sfDoc.exists()) {
    //     throw 'Document does not exist!';
    //   }
    //   const largerArray = sfDoc.get(fild);
    //   if (largerArray.length > 2) {
    //     return Promise.reject('Sorry! Population is too big');
    //   }
    //   // console.log('✅ 🧊 🪛 largerArray', largerArray);
    //   // const newPop = sfDoc.data().population + 1;
    //   largerArray.concat(update);
    //   if (update) {
    //     transaction.update(ref, fild, largerArray);
    //     return largerArray;
    //   } else {
    //     return Promise.reject('Sorry! Population is too big');
    //   }
    // });
  } catch (e) {
    console.error(e);
  }
}

export async function firebaseSnapshotStore(
  colName: any = FIRESTORE.sections
): Promise<[] | undefined> {
  try {
    const notes: any = ref([]);
    const querySnapshot = await getDocs(collection(db, colName));

    querySnapshot.forEach((doc) => {
      notes.value.push({ id: doc.id, ...doc.data() });
    });

    await onSnapshot(collection(db, colName), (snapshot) => {
      notes.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    // const formatted: any = [...notes.value].reduce((next: any, doc: any) => {
    //   const { id, ...setAll } = doc;
    //   return { ...next, [id]: Object.values(setAll) };
    // }, {});
    // const filds: any = Object.keys(FIRESTORE_COLLECTION);

    return notes;
  } catch (error: any) {
    console.log('🔺firebaseSnapshotStore', { ...error });
  }
}
export async function firebaseBdDataSetStore(
  colName: any = FIRESTORE.sections
): Promise<[] | undefined> {
  try {
    const sectionsCol = collection(db, colName);
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
