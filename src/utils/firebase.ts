import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; //Timestamp
import { firebaseConfig } from '../config/project';

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// eslint-disable-next-line @typescript-eslint/ban-types
export async function firebaseBdDataSetStore(): Promise<[] | undefined> {
  try {
    const sectionsCol = collection(db, 'sections');
    const sectionsSnapshot = await getDocs(sectionsCol);
    // const noteDate = Timestamp.fromDate(new Date());
    const sectionsList: any = sectionsSnapshot.docs.map((doc) => doc.data());
    const filtered = sectionsList.filter((item: any) => item?.accompanying || item?.simple || item?.rare);

    return filtered[0];
  } catch (error) {
    console.error('firebaseBdDataSetStore', error);
  }
}

// export const dataSetStore = firebaseBdDataSetStore();
export const functions = getFunctions(firebaseApp, 'asia-northeast1');
//export const functions = getFunctions(firebaseApp);
