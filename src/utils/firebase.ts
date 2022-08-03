import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { firebaseConfig } from "../config/project";

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

const firebaseBdSet = async () => {
  try {
    const sectionsCol = collection(db, "sections");
    const sectionsSnapshot = await getDocs(sectionsCol);
    const sectionsList = sectionsSnapshot.docs.map((doc) => doc.data());
    console.log("✅ [${lineNumber}] ~ sectionsList", sectionsList);
    return sectionsList;
  } catch (error) {
    console.log("✅ [${lineNumber}] ~ error", error);
  }
};

firebaseBdSet();

export const functions = getFunctions(firebaseApp, "asia-northeast1");
//export const functions = getFunctions(firebaseApp);
