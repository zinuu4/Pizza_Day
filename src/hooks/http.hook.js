import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { collection, getDocs, setDoc, doc, getDoc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useHttp = () => {
  const {firebaseConfig} = useSelector(state => state.firebaseConfig);
  const dispatch = useDispatch();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();


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
      console.log(email, "user data posted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const changeUserData = async (collectionName, setFunc, name, surname, birthday, city, gender, email) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const userDataToUpdate = {
        name,
        surname,
        birthday,
        city,
        gender,
      };

      await updateDoc(userDocRef, userDataToUpdate);
      dispatch(setFunc(userDataToUpdate));
      console.log(email, "user data changed");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const changeUserAvatar = async (file, collectionName, setFunc, email) => {
    const fileRef = ref(storage, `users/${email}.avatar`);
    
    const snapshot = await uploadBytes(fileRef, file);
    const avatar = await getDownloadURL(fileRef);

    try {
      const userDocRef = doc(db, collectionName, email);
      const userDataToUpdate = {
        avatar
      };

      await updateDoc(userDocRef, userDataToUpdate);
      dispatch(setFunc(userDataToUpdate));
      console.log(email, "user avatar changed");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const postFavouriteProduct = async (collectionName, email, obj) => {
    try {
      const userDocRef = doc(db, collectionName, email);
  
      await updateDoc(userDocRef, {
        favouriteProducts: arrayUnion(obj),
      });

      console.log(email, "favourite products posted");
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

  return { getData, postUserData, getDataByDocument, postFavouriteProduct, getDocumentFieldItem, deleteFavouriteProduct, changeUserData, changeUserAvatar };
}