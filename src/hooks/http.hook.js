import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { collection, getDocs, setDoc, doc, getDoc, getFirestore } from "firebase/firestore";

export const useHttp = () => {
  const {firebaseConfig} = useSelector(state => state.firebaseConfig);
  const dispatch = useDispatch();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);


  const getData = async (collectionName, setFunc) => {
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

  const getDataByDocument = async (collectionName, setFunc, documentId) => {
    try {
      const docRef = doc(collection(db, collectionName), documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const newData = {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
        dispatch(setFunc(newData));
      } else {
        console.log("Document does not exist");
      }
    } catch (e) {
      console.error("Error getting document:", e);
    }
  };

  const postData = async (collectionName, setFunc, name, surname, birthday, gender, email) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const userData = {
        name,
        surname,
        birthday,
        gender,
        email,
      };
  
      await setDoc(userDocRef, userData);
      dispatch(setFunc(userData));
      console.log("Document written with name: ", email);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return { getData, postData, getDataByDocument };
}