import { ref, watchEffect } from 'vue';
import { db, auth } from '@/utils/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const user = ref(auth.currentUser);

const getUser = () => {
  return { user };
};

export const getCollection = (c: string) => {
  const documents = ref();

  //collection reference
  const colRef = collection(db, c);
  const { user } = getUser();

  const colQ = query(colRef, where('userUid', '==', user.value?.uid));

  const unsub = onSnapshot(colQ, (snapshot) => {
    const results: { id: string }[] = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};
