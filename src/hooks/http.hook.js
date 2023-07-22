import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { collection, getDocs, setDoc, doc, getDoc, getFirestore, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useHttp = () => {
  const {firebaseConfig} = useSelector(state => state.firebaseConfig);
  const dispatch = useDispatch();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();

  const [getDataLoading, setGetDataLoading] = useState(false);
  const [getDataError, setGetDataError] = useState(false);

  const getData = async (collectionName, setFunc) => {
    setGetDataLoading(true)
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setFunc(newData));
      setGetDataLoading(false)
    } catch (e) {
      setGetDataLoading(false)
      setGetDataError(true)
      console.error("Error getting documents:", e);
    }
  };

  const [getDataByDocumentLoading, setGetDataByDocumentLoading] = useState(false);
  const [getDataByDocumentError, setGetDataByDocumentError] = useState(false);

  const getDataByDocument = async (collectionName, setFunc, documentId) => {
    setGetDataByDocumentLoading(true)
    try {
      const docRef = doc(collection(db, collectionName), documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const newData = {
          id: docSnapshot.id,
          ...docSnapshot.data()
        };
        dispatch(setFunc(newData));
        setGetDataByDocumentLoading(false)
      } else {
        setGetDataByDocumentLoading(false)
        console.log("Document does not exist");
      }
    } catch (e) {
      setGetDataByDocumentLoading(false)
      setGetDataByDocumentError(true)
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
      console.log('lol');
      await setDoc(userDocRef, userData);
      await dispatch(setFunc(userData));
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

  const deleteUserData = async (collectionName, setFunc, email) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      
      await deleteDoc(userDocRef);
  
      dispatch(setFunc());
  
      console.log(email, "user data deleted");
    } catch (e) {
      console.error("Error deleting document: ", e);
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

  const [getDocumentFieldItemLoading, setgetDocumentFieldItemLoading] = useState(false);
  const [getDocumentFieldItemError, setgetDocumentFieldItemError] = useState(false);

  const getDocumentFieldItem = async (collectionName, setFunc, email, itemName) => {
    setgetDocumentFieldItemLoading(true);
    try {
      const userDocRef = doc(db, collectionName, email);
  
      const userDocSnapshot = await getDoc(userDocRef);
      const existingData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
  
      const items = existingData[itemName] || [];

      dispatch(setFunc(items))
      setgetDocumentFieldItemLoading(false);
      return items;
    } catch (e) {
      setgetDocumentFieldItemLoading(false);
      setgetDocumentFieldItemError(true);
      console.error("Error fetching 'favouriteProducts' array data: ", e);
      return [];
    }
  };

  const postReview = async (collectionName, name, email, review) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const reviewData = {
        name,
        email,
        review
      };

      await setDoc(userDocRef, reviewData);
      console.log(email, "Review posted");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const postOrder = async ({collectionName, setFunc, email, receivingMethod, time, cashPayment, cardPayment, numberOfPerson, comment, order, date, orderPrice, id}) => {
    try {
        const userDocRef = doc(db, collectionName, email);

        const removeUndefined = (obj) => {
            const result = {};
            Object.entries(obj).forEach(([key, value]) => {
                if (value !== undefined) {
                    if (typeof value === 'object' && !Array.isArray(value)) {
                        result[key] = removeUndefined(value);
                    } else if (Array.isArray(value)) {
                        result[key] = value.map((item) =>
                            typeof item === 'object' ? removeUndefined(item) : item
                        );
                    } else {
                        result[key] = value;
                    }
                }
            });
            return result;
        };

        const filteredOrder = removeUndefined(order);

        const orderData = {
            receivingMethod,
            time,
            cashPayment,
            cardPayment,
            numberOfPerson,
            comment,
            date,
            orderPrice,
            id,
            ...filteredOrder,
        };

        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (!userData.orders) {
                userData.orders = [];
            }
            userData.orders.push(orderData);
            await updateDoc(userDocRef, userData);
        } else {
            await setDoc(userDocRef, { orders: [orderData] });
        }
        dispatch(setFunc({time, id, date, orderPrice}))
    } catch (e) {
        console.error("Error adding order: ", e);
    }
}


  return { getData, getDataLoading, getDataError, postUserData, getDataByDocument, getDataByDocumentLoading, getDataByDocumentError, postFavouriteProduct, getDocumentFieldItem, getDocumentFieldItemLoading, getDocumentFieldItemError, deleteFavouriteProduct, changeUserData, changeUserAvatar, deleteUserData, postReview, postOrder };
}