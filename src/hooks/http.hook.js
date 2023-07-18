import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { collection, getDocs, setDoc, doc, getDoc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";

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

  const postUserData = async (collectionName, setFunc, name, surname, birthday, gender, email) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const userData = {
        name,
        surname,
        birthday,
        gender,
        email,
        favouriteProducts: []
      };
  
      await setDoc(userDocRef, userData);
      dispatch(setFunc(userData));
      console.log("Document written with name: ", email);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const postFavouriteProduct = async (collectionName, email, obj) => {
    try {
      const userDocRef = doc(db, collectionName, email);
  
      await updateDoc(userDocRef, {
        favouriteProducts: arrayUnion(obj),
      });

      console.log("Document written with name: ", email);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const deleteFavouriteProduct = async (collectionName, email, setFunc, objNameToRemove) => {
    try {
      const userDocRef = doc(db, collectionName, email);
  
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        console.error("Document does not exist");
        return;
      }
  
      const existingData = userDocSnapshot.data();
      if (!existingData.favouriteProducts || !Array.isArray(existingData.favouriteProducts)) {
        console.error("favouriteProducts is not an array or does not exist");
        return;
      }
  
      const updatedFavouriteProducts = existingData.favouriteProducts.filter((item) => item.name !== objNameToRemove);
  
      await updateDoc(userDocRef, {
        favouriteProducts: updatedFavouriteProducts,
      });
      dispatch(setFunc(updatedFavouriteProducts));
      console.log("Document updated with name: ", email);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  

  const getDocumentFieldItem = async (collectionName, setFunc, email, itemName) => {
    try {
      const userDocRef = doc(db, collectionName, email);
  
      const userDocSnapshot = await getDoc(userDocRef);
      const existingData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
  
      const items = existingData[itemName] || [];

      dispatch(setFunc(items))
      return items;
    } catch (e) {
      console.error("Error fetching 'favouriteProducts' array data: ", e);
      return [];
    }
  };

  return { getData, postUserData, getDataByDocument, postFavouriteProduct, getDocumentFieldItem, deleteFavouriteProduct };
}