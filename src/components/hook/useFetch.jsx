import { useEffect, useState } from "react";
import { db } from "../../lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const useFetch = (collectionName) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDatas = async () => {
      const postRef = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(postRef, async (snapshot) => {
        const postData = await Promise.all(
          snapshot.docs.map(async (docs) => {
            const postItems = { ...docs.data(), id: docs.id };
            const userRef = doc(db, "users", postItems?.userId);
            const getUser = await getDoc(userRef);

            if (getUser.exists()) {
              const { createdAt, ...rest } = getUser.data();
              return { ...postItems, ...rest };
            }
          })
        );
        setData(postData);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    getDatas();
  }, [collectionName]);
  return {
    data,
    loading,
  };
};

export default useFetch;
