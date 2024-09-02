import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import { useEffect, useState } from "react";

const useSingleFetch = (collectionName, id, subCollection) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getSingleData = () => {
      if (id) {
        const postRef = query(
          collection(db, collectionName, id, subCollection)
        );
        onSnapshot(postRef, (snapshot) => {
         try {
          setData(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
          setLoading(false);
         } catch (error) {
          console.log(error);
          
         }
        });
      }
    };
    getSingleData();
  }, [db, id]);

  return {
    data,
    loading,
  };
};

export default useSingleFetch;
