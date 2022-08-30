import { ref, watchEffect, Ref } from 'vue';
import { db, auth } from '@/utils/firebase';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
// import { getUser } from '@/composables/useAuth';
// const user = ref(auth.currentUser);
// console.log('✅ 🧊 ~ user', user);

// const getUser = () => {
//   return { user };
// };

type Documents = {
  value: any[];
};

export const getCollection = async (
  c: string
): Promise<any[] | undefined | object> => {
  const documents: any = ref<Ref>();

  //collection reference
  const colRef = collection(db, c);
  const colQ: any = await getDocs(colRef);

  const unsub = onSnapshot(colQ, (snapshot: any) => {
    const results: { id: string }[] = [];
    snapshot.docs.forEach((doc: any) => {
      results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
    console.log('✅ 🧊 ~ documents.value', documents.value);
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });
  console.log('✅ 🧊 ~ documents.value', documents.value);
  const filtered = documents.value.filter(
    (item: any) => item?.accompanying || item?.simple || item?.rare
  );
  console.log('✅ 🧊 ~ filtered', filtered);
  return { filtered, documents };
};
