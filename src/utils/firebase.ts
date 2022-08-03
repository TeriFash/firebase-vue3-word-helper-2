import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from "../config/project";

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

// eslint-disable-next-line @typescript-eslint/ban-types
export async function firebaseBdDataSetStore(): Promise<[] | undefined> {
  try {
    const sectionsCol = collection(db, "sections");
    const sectionsSnapshot = await getDocs(sectionsCol);
    const sectionsList: any = sectionsSnapshot.docs.map((doc) => doc.data());
    return sectionsList;
  } catch (error) {
    console.error("firebaseBdDataSetStore", error);
  }
}

// export const dataSetStore = firebaseBdDataSetStore();
export const functions = getFunctions(firebaseApp, "asia-northeast1");
//export const functions = getFunctions(firebaseApp);
