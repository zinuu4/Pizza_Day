import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useHttp = () => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const storage = getStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [getDataLoading, setGetDataLoading] = useState(false);
  const [getDataError, setGetDataError] = useState(false);

  const getData = async (collectionName, setFunc) => {
    setGetDataLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setFunc(newData));
      setGetDataLoading(false);
    } catch (e) {
      setGetDataLoading(false);
      setGetDataError(true);
    }
  };

  const getDataByDocument = async (collectionName, setFunc, documentId) => {
    setLoading(true);
    try {
      const docRef = doc(collection(db, collectionName), documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const newData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
        dispatch(setFunc(newData));
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  const postUserData = async (
    collectionName,
    setFunc,
    name,
    surname,
    birthday,
    gender,
    email
  ) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const userData = {
        name,
        surname,
        birthday,
        gender,
        email,
        favouriteProducts: [],
      };
      await setDoc(userDocRef, userData);
      await dispatch(setFunc(userData));
    } catch (e) {}
  };

  const changeUserData = async (
    collectionName,
    setFunc,
    name,
    surname,
    birthday,
    city,
    gender,
    email
  ) => {
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
    } catch (e) {}
  };

  const deleteUserData = async (collectionName, setFunc, email) => {
    try {
      const userDocRef = doc(db, collectionName, email);

      await deleteDoc(userDocRef);

      dispatch(setFunc());
    } catch (e) {}
  };

  const changeUserAvatar = async (file, collectionName, setFunc, email) => {
    const fileRef = ref(storage, `users/${email}.avatar`);

    const snapshot = await uploadBytes(fileRef, file);
    const avatar = await getDownloadURL(fileRef);

    try {
      const userDocRef = doc(db, collectionName, email);
      const userDataToUpdate = {
        avatar,
      };

      await updateDoc(userDocRef, userDataToUpdate);
      dispatch(setFunc(userDataToUpdate));
    } catch (e) {}
  };

  const postFavouriteProduct = async (collectionName, email, obj) => {
    try {
      const userDocRef = doc(db, collectionName, email);

      await updateDoc(userDocRef, {
        favouriteProducts: arrayUnion(obj),
      });
    } catch (e) {}
  };

  const deleteFavouriteProduct = async (
    collectionName,
    email,
    setFunc,
    objNameToRemove
  ) => {
    try {
      const userDocRef = doc(db, collectionName, email);

      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        return;
      }

      const existingData = userDocSnapshot.data();
      if (
        !existingData.favouriteProducts ||
        !Array.isArray(existingData.favouriteProducts)
      ) {
        return;
      }

      const updatedFavouriteProducts = existingData.favouriteProducts.filter(
        (item) => item.name !== objNameToRemove
      );

      await updateDoc(userDocRef, {
        favouriteProducts: updatedFavouriteProducts,
      });
      dispatch(setFunc(updatedFavouriteProducts));
    } catch (e) {}
  };

  const getDocumentFieldItem = async (
    collectionName,
    setFunc,
    email,
    itemName
  ) => {
    setLoading(true);
    try {
      const userDocRef = doc(db, collectionName, email);

      const userDocSnapshot = await getDoc(userDocRef);
      const existingData = userDocSnapshot.exists()
        ? userDocSnapshot.data()
        : {};

      const items = existingData[itemName] || [];

      dispatch(setFunc(items));
      setLoading(false);
      return items;
    } catch (e) {
      setLoading(false);
      setError(true);
      return [];
    }
  };

  const postReview = async (collectionName, name, email, review) => {
    try {
      const userDocRef = doc(db, collectionName, email);
      const reviewData = {
        name,
        email,
        review,
      };

      await setDoc(userDocRef, reviewData);
    } catch (e) {}
  };

  const postOrder = async ({
    collectionName,
    setFunc,
    email,
    receivingMethod,
    time,
    cashPayment,
    cardPayment,
    numberOfPerson,
    comment,
    order,
    date,
    orderPrice,
    id,
  }) => {
    try {
      const userDocRef = doc(db, collectionName, email);

      const removeUndefined = (obj) => {
        const result = {};
        Object.entries(obj).forEach(([key, value]) => {
          if (value !== undefined) {
            if (typeof value === "object" && !Array.isArray(value)) {
              result[key] = removeUndefined(value);
            } else if (Array.isArray(value)) {
              result[key] = value.map((item) =>
                typeof item === "object" ? removeUndefined(item) : item
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
      dispatch(setFunc({ time, id, date, orderPrice }));
    } catch (e) {}
  };

  return {
    loading,
    error,
    getData,
    getDataLoading,
    getDataError,
    postUserData,
    getDataByDocument,
    postFavouriteProduct,
    getDocumentFieldItem,
    deleteFavouriteProduct,
    changeUserData,
    changeUserAvatar,
    deleteUserData,
    postReview,
    postOrder,
  };
};
