import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const useHttp = () => {
  const {firebaseConfig} = useSelector(state => state.firebaseConfig);
  const dispatch = useDispatch();


  const fetchData = async (collectionName, setFunc) => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setFunc(newData));
    } catch (e) {
      console.error("Error getting documents:", e);
    }
  };

  return fetchData;
}